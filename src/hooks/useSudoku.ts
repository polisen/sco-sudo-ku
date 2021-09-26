import { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';

interface Validity {
  x: number;
  y: number;
  v: string;
}

export default function useSudoku() {
  const firebase: any = useFirebase();
  const [board, setBoard] = useState([[0]]);
  const [solution, setSolution] = useState([[0]]);
  const [empty, setEmpty] = useState([[true]]);
  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const getBoard = firebase.functions().httpsCallable('getBoard');

  useEffect(() => {
    setLoading(true);
    setSolved(false);
    getBoard({ difficulty }).then((result: any) => {
      setBoard(result.data.board);
      setSolution(result.data.solution);
      setEmpty(result.data.empty);
    });
  }, [difficulty]);

  useEffect(() => {
    if (empty.length > 1) {
      setLoading(false);
    }
  }, [empty]);

  /**
   * @param x - coordinate
   * @param y - coordinate
   * @param v - event target value.
   */
  function handleValidity({ x, y, v }: Validity) {
    const val = Number(v.replace('0', ''));
    if ((val < 10 || val === 0) && solution[x][y] === val && empty[x][y]) {
      const newBoard = [...board];
      newBoard[x][y] = val;
      setBoard(newBoard);
      setEmpty(() => {
        const e = [...empty];
        delete e[x][y];
        return e;
      });
    }
  }

  function solve() {
    setBoard(solution);
    setSolved(true);
  }

  return {
    board,
    solved,
    empty,
    solve,
    difficulty,
    loading,
    getSolution: () => solve(),
    setDifficulty: (d: string) => setDifficulty(d),
    checkValidity: handleValidity,
  };
}
