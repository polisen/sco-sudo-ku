import * as React from 'react';
import './App.css';
import styled from 'styled-components';
import useSudoku from './hooks/useSudoku';
import Board from './features/Board';
import { Spinner } from './components/Spinner';
import Difficulty, { Button } from './components/DifficultyButtons';

const MainLayout = styled.div<{ solved: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ solved }) => solved && '#75DDDD'};
`;

function App() {
  const {
    board,
    loading,
    solved,
    difficulty,
    empty,
    getSolution,
    setDifficulty,
    checkValidity,
  } = useSudoku();

  return (
    <MainLayout solved={solved}>
      {!loading && (!solved ? 'TIP: The number is only inserted if its right.' : 'Solved')}
      <br />
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <Board board={board} empty={empty} onChange={checkValidity} />
      )}
      <Difficulty
        onClick={(d: string) => setDifficulty(d)}
        difficulty={difficulty}
      />
      <Button selected={false} type="button" onClick={() => getSolution()}>
        Solve
      </Button>
    </MainLayout>
  );
}

export default App;
