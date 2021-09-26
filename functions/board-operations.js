const { whichQuadrant, checkSameness, validChoice } = require("./checker-functions");
const {getRandomTuple, getInitialQuadrantInformation, inDifficultyRange} = require('./utility-functions')

const deepClone = (matrix) => matrix.map((arr) => [...arr]);

function generateBoardSeed() {
  const quadrants = getInitialQuadrantInformation();
  const board = [];
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


const generateUnique = function recursiveUniqueBoardGenerator(originalBoard, mutatingBoard) {
  const [x, y] = getRandomTuple();

  mutatingBoard[x][y] = 0;
  const reversedBoard = deepClone(mutatingBoard).reverse();
  const reversedSolve = solve(reversedBoard);
  const returnedBoard = reversedSolve.reverse();
  const same = checkSameness(returnedBoard, originalBoard);
  if (same) {
    generateUnique(originalBoard, mutatingBoard);
  }
  return mutatingBoard;
}





function findEmpties(unique) {
  const emptyCoords = [];
  let amountEmpty = 0;
  unique.forEach((column, x) => {
    emptyCoords.push([]);
    column.forEach((element, y) => {
      if (!element) {
        emptyCoords[x][y] = true;
        amountEmpty += 1;
      }
    });
  });

  return [amountEmpty, emptyCoords];
}

function emptySlot(board) {
  let condition = true;
  let x = -1;
  let y = -1;
  board.every((col, xIdx) => {
    col.every((e, yIdx) => {
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
 * This function recursively finds and 
 * @param {number[][]} board 
 * @returns {board} 
 */

function solve(board) {
  const [x, y] = emptySlot(board);

  if (x === -1) {
    return board;
  }
  for (let num = 1; num <= 9; num += 1) {
    if (validChoice(board, x, y, num)) {
      board[x][y] = num;
      solve(board);
    }
  }

  if (emptySlot(board)[0] !== -1) {
    board[x][y] = 0;
  }

  return board;
}

module.exports = {
  generateBoardSeed,
  inDifficultyRange,
  solve,
  generateUnique,
  findEmpties,
  deepClone
};
