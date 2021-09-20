import * as React from 'react';
import { useState } from 'react';

import './App.css';
import styled from 'styled-components';
import Board from './features/Board';
import generate, { whichQuadrant } from './BoardGenerator';

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

function App() {
  const [board] = useState(generate());

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
