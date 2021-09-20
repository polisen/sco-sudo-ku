import React from 'react';

import './App.css';
import styled from 'styled-components';
import Board from './features/Board';
import { rrfProps } from './app/store';

const board = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; height: 100vh;
`;

function App() {
  console.debug(rrfProps);
  return (
    <MainLayout>
      <Board board={board} onClick={(obj: any) => console.debug(obj)} />
    </MainLayout>
  );
}

export default App;
