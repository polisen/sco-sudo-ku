import { nanoid } from '@reduxjs/toolkit';
import * as React from 'react';
import styled from 'styled-components';
import Column from './Column';

const BoardLayout = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 24px;
  overflow: hidden;
  /* border-radius: 8px; */
background: #ffffff;
box-shadow:  11px 11px 22px #16521b13,
             -11px -11px 22px #154d1a13;
`;

interface BoardProps {
  board: number[][];
  empty: boolean[][];
  onChange: Function;
}

const Board = ({ board, empty, onChange }: BoardProps) => (
  <BoardLayout>
    {board.map((col, x) => (
      <Column
        key={nanoid()}
        {...{
          empty: empty[x],
          col,
          x,
          onChange,
        }}
      />
    ))}
  </BoardLayout>
);

export default Board;
