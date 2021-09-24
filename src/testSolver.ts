/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
let check = 0;
function nextEmptySpot(board: number[][]) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
}

function checkRow(
  board: { [x: string]: any[] },
  row: string | number,
  value: any,
) {
  for (let i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  return true;
}

function checkColumn(
  board: string | any[],
  column: string | number,
  value: any,
) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  return true;
}

function checkSquare(board: any[][], row: number, column: number, value: any) {
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(column / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) return false;
    }
  }

  return true;
}

function checkValue(board: any, row: number, column: number, value: number) {
  if (
    checkRow(board, row, value)
    && checkColumn(board, column, value)
    && checkSquare(board, row, column, value)
  ) {
    check++;
    console.debug(check);
    return true;
  }

  return false;
}

function solve(board: number[][]) {
  const emptySpot = nextEmptySpot(board);
  const row = emptySpot[0];
  const col = emptySpot[1];

  // there is no more empty spots
  if (row === -1) {
    return board;
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValue(board, row, col, num)) {
      board[row][col] = num;
      solve(board);
    }
  }

  if (nextEmptySpot(board)[0] !== -1) board[row][col] = 0;

  return board;
}

export default solve;
