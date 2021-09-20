import * as React from 'react';
import styled from 'styled-components';

interface SlotProps {
  index: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function getBorderStyle(index: number) {
  if (index === 8) return '0';
  if ((index + 1) % 3) {
    return '1px solid grey';
  }
  return '2px solid black';
}

const Slot = styled.div<SlotProps>`
  width: 3em;
  height: 3em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ index }) => getBorderStyle(index)};
  :hover {
    background-color: beige;
  }
`;

interface ColumnProps {
  col: number[];
  index: number;
  onClick: Function;
}

const ColumnLayout = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  border-right: ${({ index }) => getBorderStyle(index)};
`;

const Column = ({ col, index, onClick }: ColumnProps) => (
  <ColumnLayout index={index}>
    {col.map((e: number, i: number) => (
      <Slot index={i} onClick={() => onClick({ row: i })}>
        {e}
      </Slot>
    ))}
  </ColumnLayout>
);

interface BoardProps {
  board: number[][];
  onClick: Function;
}

const BoardLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const Board = ({ board, onClick }: BoardProps) => (
  <BoardLayout>
    {board.map((col, index) => (
      <Column {...{ col, index, onClick: (obj: object) => onClick({ ...obj, column: index }) }} />
    ))}
  </BoardLayout>
);

export default Board;
