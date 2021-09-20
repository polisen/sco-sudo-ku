import React from 'react';

import './App.css';
import styled from 'styled-components';
import Board from './features/Board';
import generate, { whichQuadrant } from './BoardGenerator';

const board = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 4],
];

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

function App() {
  generate(board);
  return (
    <MainLayout>
      <Board
        board={board}
        onClick={({ row, column }: any) => console.debug(whichQuadrant([column, row]))}
      />
    </MainLayout>
  );
}

export default App;
