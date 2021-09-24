/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/**
 * Takes coordinates and figures out which quadrant the number belongs to.
 * @param array - x,y coordinates
 * @returns which quadrant it is - counted vertically.
 */

type Board = number[][];

const reduceNumber = (n: number) => Math.floor(n / 3) + 1;

// O(3)
export function whichQuadrant([x, y]: [number, number]): number {
  const rx = reduceNumber(x);
  switch (reduceNumber(y)) {
    case 1:
      return rx - 1;
    case 2:
      if (rx === 1) return 3;
      if (rx === 2) return 4;
      if (rx === 3) return 5;
      break;
    case 3:
      if (rx === 1) return 6;
      if (rx === 2) return 7;
      if (rx === 3) return 8;
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

// O(n*n) - awful
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

/**
 * This function returns whether or not a certain number
 * in a certain position is a valid sudoku move.
 * @param board - 2d array
 * @param col - index number of current column.
 * @param row - index number of current row.
 * @param num - number being considered for placement
 * @returns {boolean} - is the current number a valid choice.
 */

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

/**
 * Returns the coordinates of the next empty slot.
 * @param board 2d array
 * @returns {[x,y]} - coordinates of the next empty slot in the board.
 */

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

/**
 * Recursively solves a board in any configuration.
 * Inserts new valid sudoku moves until it cannot find another one.
 * If the board is full, it's done.
 * If the board is not filled - it removes the last move and tries the next.
 * It's a depth first search algorithm.
 * @param board - 2d array.
 * @returns {board} - board in it solved state.
 */
export function oldSolve(
  board: number[][],
  quadrantInfo: number[][],
): number[][] {
  const [x, y] = emptySlot(board);
  // const q = whichQuadrant([x, y]);

  if (x === -1) {
    return board;
  }
  for (let num = 1; num <= 9; num += 1) {
    if (validChoice(board, x, y, num)) {
      board[x][y] = num;
      oldSolve(board, quadrantInfo);
    }
  }

  if (emptySlot(board)[0] !== -1) board[x][y] = 0;

  return board;
}

export function RecursiveSudokuDFS(
  board: number[][],
  quadrantInfo: number[][],
  newestNumber: number = 0,
): number[][] {
  const [x, y] = emptySlot(board);
  const q = whichQuadrant([x, y]);
  if (x === -1) {
    return board;
  }
  // for each number available number in the quadrant.
  // check if
  const quadrant = quadrantInfo[q];

  quadrant.forEach((num, index) => {
    if (validChoice(board, x, y, num)) {
      board[x][y] = num;
      delete quadrantInfo[q][index];

      RecursiveSudokuDFS(board, quadrantInfo, num);
      quadrantInfo[q][index] = num;
    }
  });

  if (emptySlot(board)[0] !== -1) {
    if (newestNumber) quadrantInfo[q][newestNumber - 1] = newestNumber;
    board[x][y] = 0;
  }

  return board;
}
// check if the grid is full.
// if it is - return board.
// for each empty slot in the grid.
// for all numbers between 1-9
// check if the number is a valid choice.
// if it is - insert it.
// call the solve algorithm again with the new board

export default RecursiveSudokuDFS;
