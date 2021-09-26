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
box-shadow:  11px 11px 22px #f0f0f0,
             -11px -11px 22px #ffffff;
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
