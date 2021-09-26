import * as React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input<{ index: number }>`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  :hover {
    background-color: #996fd3;
  }
  :focus {
    background-color: #d9d9d9;
    border: none;
    outline: none;
    appearance: none;
  }
`;

interface NumberInputProps {
  value: number;
  onChange: Function;
  index: number;
}

const NumberInput = ({ value, onChange, index }: NumberInputProps) => (
  <StyledInput
    type="text"
    index={index}
    value={value !== 0 ? value : ''}
    onChange={(e) => onChange({ v: e.target.value })}
  />
);

export default NumberInput;
