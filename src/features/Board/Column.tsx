import React from 'react';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { getBorderStyle } from './utility';
import NumberInput from './Input';

const Slot = styled.div<SlotProps>`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ index }) => getBorderStyle(index)};
  :hover {
    background-color: #d9d9d9
  }
`;

const ColumnLayout = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  border-right: ${({ index }) => getBorderStyle(index)};
`;

interface SlotProps {
  index: number;
  empty: boolean;
}

interface ColumnProps {
  col: number[];
  empty: boolean[];
  x: number;
  onChange: Function;
}

export const ColumnComponent = ({
  col, x, empty, onChange,
}: ColumnProps) => (
  <ColumnLayout index={x}>
    {col.map((e: number, y: number) => (
      <Slot key={nanoid()} empty={empty[y]} index={y}>
        {!empty[y] ? (
          e
        ) : (
          <NumberInput
            value={e}
            index={y}
            onChange={(o: object) => onChange({ ...o, x, y })}
          />
        )}
      </Slot>
    ))}
  </ColumnLayout>
);

export default ColumnComponent;
