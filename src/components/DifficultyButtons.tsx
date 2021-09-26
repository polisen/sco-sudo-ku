import * as React from 'react';
import styled from 'styled-components';

export const Button = styled.button<{ selected: boolean }>`
  margin: 1em;
  padding: 1em 3em 1em 3em;
    border: 0;
  border-radius: 8px;
    background-color: ${({ selected }) => (selected ? '#E8EC67' : 'white')};
  :hover {
    background-color: #E8EC67;
  }
  border-radius: 8px;

  box-shadow: 6px 6px 12px #d6d6d6, -6px -6px 12px #ffffff;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 3em;
`;

const DifficultyComponent = ({
  onClick,
  difficulty,
}: {
  onClick: Function;
  difficulty: string;
}) => (
  <ButtonContainer>
    {['easy', 'medium', 'hard'].map((d: string) => (
      <Button selected={difficulty === d} onClick={() => onClick(d)}>
        {d}
      </Button>
    ))}
  </ButtonContainer>
);

export default DifficultyComponent;
