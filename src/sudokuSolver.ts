/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/**
 * Takes coordinates and figures out which quadrant the number belongs to.
 * @param array - x,y coordinates
 * @returns which quadrant it is - counted vertically.
 */

type Board = number[][];

const reduceNumber = (n: number) => Math.floor(n / 3) + 1;

export function whichQuadrant([x, y]: [number, number]): number {
  const rx = reduceNumber(x);
  switch (reduceNumber(y)) {
    case 1:
      return rx;
    case 2:
      if (rx === 1) return 4;
      if (rx === 2) return 5;
      if (rx === 3) return 6;
      break;
    case 3:
      if (rx === 1) return 7;
      if (rx === 2) return 8;
      if (rx === 3) return 9;
      break;
    default:
      break;
  }

  return 0;
}

/**
 * This function takes the board and returns a 2d array of each quadrants numbers.
 * @param board {Board} - the current board - in whichever state.
 * @returns board
 */

export function getQuadrants(board: Board): Board {
  let quads: number[][] = [];
  board.forEach((col, index) => {
    col.forEach((el, idx) => {
      if (el && el >= 0 && el <= 9) {
        const quadIDX = whichQuadrant([index, idx]);
        if (!quads[quadIDX]) quads[quadIDX] = [];
        quads[quadIDX].push(el);
      }
    });
  });
  quads = quads.map((arr: number[]) => [...new Set(arr)]);
  return quads;
}

function validChoice(board: number[][], col: number, row: number, num: number) {
  let indicator = true;
  if (board[col].includes(num)) {
    indicator = false;
  }
  board.forEach((c) => {
    if (c[row] === num) {
      indicator = false;
    }
  });

  const quadrants = getQuadrants(board);
  const q = whichQuadrant([col, row]);

  if (quadrants[q] && quadrants[q].includes(num)) {
    indicator = false;
  }

  return indicator;
}

function emptySlot(board: number[][]) {
  let condition = true;
  let x: number = -1;
  let y: number = -1;
  board.every((col: number[], xIdx) => {
    col.every((e: number, yIdx) => {
      if (e === 0) {
        x = xIdx;
        y = yIdx;
        condition = false;
        return condition;
      }
      return condition;
    });
    return condition;
  });
  return [x, y];
}

function solve(board: number[][]): number[][] {
  const [x, y] = emptySlot(board);

  console.debug([x, y]);
  if (x === -1) {
    return board;
  }
  for (let num = 1; num <= 9; num += 1) {
    if (validChoice(board, x, y, num)) {
      board[x][y] = num;
      solve(board);
    }
  }

  if (emptySlot(board)[0] !== -1) board[x][y] = 0;

  return board;
}
// check if the grid is full.
// if it is - return board.
// for each number in the grid.
// if the number is 0
// for all numbers between 1-9
// check if the number is a valid choice.
// if it is - insert it.
// call the solve algorithm again with the new board

export default solve;
