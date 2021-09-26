import * as React from 'react';
import styled from 'styled-components';

export const Button = styled.button<{ selected: boolean }>`
  margin: 1em;
  padding: 1em 3em 1em 3em;
  border: 0;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? 'linear-gradient(145deg, #996fd3, #632cb1);' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.08),
    -6px -6px 12px rgba(0, 0, 0, 0.08);
  :hover {
      transition: all .2s ease-in-out;
    color: white;
    background-color: #632cb1;
    background: linear-gradient(145deg, #996fd3, #632cb1);
    box-shadow: 11px 11px 22px #f0f0f0, -11px -11px 22px #ffffff;
  }
  border-radius: 8px;


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
