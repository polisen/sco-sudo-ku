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
  y: number;
  onClick: Function;
}

const ColumnLayout = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  border-right: ${({ index }) => getBorderStyle(index)};
`;

const NumberInput = styled.input<{ index: number }>`

width: 100%;
height: 100%;
text-align: center; 
border: none;
border-bottom: ${({ index }) => getBorderStyle(index)};
:focus {
  background-color: beige;
  border: none;
}

`;
const Column = ({ col, y, onClick }: ColumnProps) => (
  <ColumnLayout index={y}>
    {col.map((e: number, x: number) => (
      <Slot index={x} onClick={() => onClick({ row: x })}>
        {e !== 0 ? e : <NumberInput index={x} />}
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
    {board.map((col, y) => (
      <Column {...{ col, y, onClick: (obj: object) => onClick({ ...obj, column: y }) }} />
    ))}
  </BoardLayout>
);

export default Board;
