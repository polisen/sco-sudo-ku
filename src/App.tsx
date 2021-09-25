import * as React from 'react';
import { useState, useEffect } from 'react';

import './App.css';
import styled from 'styled-components';
import Board from './features/Board';
import generate from './BoardGenerator';
import { whichQuadrant } from './sudokuSolver';

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Button = styled.button`
  margin: 1em;
  padding: 1em 3em 1em 3em;
  border: 0;
  border-radius: 8px;
  :hover {
    background-color: #4040ff;
  }

`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 10em;
  margin: 10em;

`;

const Difficulty = ({ onClick }: { onClick: Function }) => (
  <ButtonContainer>
    {['easy', 'medium', 'hard'].map((d: string) => <Button onClick={() => onClick(d)}>{d}</Button>)}
  </ButtonContainer>
);

function App() {
  const [board, setBoard] = useState([[2]]);
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    console.debug(difficulty);
    setBoard(generate(difficulty));
  }, [difficulty]);

  return (
    <MainLayout>
      <Board
        board={board}
        onClick={({ row, column }: any) => console.debug(whichQuadrant([column, row]))}
      />
      <Difficulty onClick={(d: string) => setDifficulty(d)} />
    </MainLayout>
  );
}

export default App;
