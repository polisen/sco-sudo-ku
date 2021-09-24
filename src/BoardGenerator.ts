/* eslint-disable no-param-reassign */
import solve from './sudokuSolver';

type Board = number[][];

/**
 * Fisher Yates Shuffle Algorithm
 * Imported from stackoverflow because
 * I absolutely cannot improve it.
 */

function shuffle(array: number[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const reduceNumber = (n: number) => Math.floor(n / 3) + 1;

function whichQuadrant([x, y]: [number, number]): number {
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

// generate a board with quadrant 1, 5, 9 completely
// randomly as there is no direct relationship between them.
// for each quadrant - shuffle the numbers.
// fill quadrant 1, 5, 9 with the shuffled numbers.
// check if there is a solution.
// if there is - add another number.
// check again.

function getInitialQuadrantInformation(): Board {
  const board = [];
  for (let i = 0; i < 9; i += 1) {
    if ([0, 4, 8].includes(i)) {
      board.push(shuffle(Array.from(Array(9), (e, index) => index + 1)));
    } else {
      const zeroArray = new Array(9).fill(0);
      board.push(zeroArray);
    }
  }
  console.debug(board);
  return board;
}

function generateBoardSeed(): Board {
  const quadrants: Board = getInitialQuadrantInformation();
  const board: Board = [];
  for (let i = 0; i < 9; i += 1) {
    if (!board[i]) board[i] = [];
    for (let j = 0; j < 9; j += 1) {
      const q = whichQuadrant([i, j]) - 1;
      if ([0, 4, 8].includes(q)) {
        board[i][j] = quadrants[q].shift() ?? 0;
      } else {
        board[i][j] = 0;
      }
    }
  }

  return board;
}

function generate(): Board {
  const board = generateBoardSeed();
  //   const board = [
  //     [0, 5, 1, 3, 6, 2, 7, 0, 0],
  //     [0, 4, 0, 0, 5, 8, 0, 0, 0],
  //     [0, 0, 0, 4, 0, 0, 0, 2, 5],
  //     [0, 8, 0, 0, 0, 0, 9, 0, 3],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [7, 0, 5, 0, 0, 0, 0, 8, 0],
  //     [1, 2, 0, 0, 0, 9, 0, 0, 0],
  //     [0, 0, 0, 2, 8, 0, 0, 6, 0],
  //     [0, 0, 8, 5, 3, 4, 2, 9, 0],
  //   ];

  const solved = solve(board);

  console.debug(solved);
  return board;
}

export default generate;
