const {
  whichQuadrant,
  checkSameness,
  validChoice,
} = require("./checker-functions");
const {
  getRandomTuple,
  getInitialQuadrantInformation,
  inDifficultyRange,
} = require("./utility-functions");


/**
 * Deep clone of 2d array so that the recursive algorithms don't
 * overwrite stuff in the secondly layered array.
 * @param {any[][]} matrix - any 2d array
 * @returns a new but identical 2d array
 */
const deepClone = (matrix) => matrix.map((arr) => [...arr]);

/**
 * This function creates the initial state of the board.
 * The diagonal quadrants in a sudoku board has no direct numerical relationship
 * so I can safely fill them with random numbers without any effect on the outcome
 * but with supposed great performance increase in generating a board.
 * 
 * I say supposed because I haven't measured it but it just makes sense doesn't it.
 * Of course the whole quadrant system is super shitty so that probably negates
 * any positive effect. Oh well.
 * @returns number[][] - semi-filled board.
 */

function generateBoardSeed() {
  // get a list of all the quadrants information
  const quadrants = getInitialQuadrantInformation();
  const board = [];
  for (let i = 0; i < 9; i += 1) {
    if (!board[i]) board[i] = [];
    for (let j = 0; j < 9; j += 1) {
      const q = whichQuadrant([i, j]) - 1;
      // if we are at one of the desired quadrants.
      if ([0, 4, 8].includes(q)) {
        // position the randomly ordered number from the quadrant on the board.
        board[i][j] = quadrants[q].shift() ?? 0;
      } else {
        board[i][j] = 0;
      }
    }
  }

  return board;
}
/**
 * This function naively finds a sort of unique board by randomly
 * removing numbers and checking whether or not the solved version
 * of that board resolves into the filled board.
 * 
 * If it does - it's presumed that the solution is still unique and it recurses.
 * 
 * Since there is no element of randomness in the solve algorithm
 * I think it would always come to the same conclusion no matter how many
 * numbers are removed randomly
 * 
 * To mitigate this - I flip the board horizontally and solve that instead.
 * This has no effect on the sudoku-ness of the board but creates some randomness
 * since it has the effect of running the solve algorithm at another angle.
 * 
 * Maybe.
 * 
 * This is all just very made up.
 * 
 * To randomize more I should rotate in a clock-wise fashion instead 
 * of just flipping it back and forth,
 * but it seems hard and I'm way over schedule.
 * 
 * @param {number[][]} originalBoard - the filled board.
 * @param {number[][]} mutatingBoard - the working board.
 * @returns mutatingBoard
 */
const generateUnique = function recursiveUniqueBoardGenerator(
  originalBoard,
  mutatingBoard
) {
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
};



/**
 * This function simultaneously finds how many empty slots there are:
 *  - for difficulty assertion
 * and where those numbers are:
 *  - representing prefilled- or editable slots.
 * @param {number[][]} unique - board with holes in it.
 * @returns [number, boolean[][]]
 */
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

/**
 * This function walks through each slot and returns immediately on empty - (0)
 * @param {number[][]} board
 * @returns [x,y] coordinates of next empty slot - or [-1,-1] if no empty slots are found.
 */
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
 * This function recursively generates filled valid sudoku boards.
 * using a popular backtracking algorithm.
 * @param {number[][]} board
 * @returns board
 */

function solve(board) {
  // get co-ordinates of next empty slot in board.
  const [x, y] = emptySlot(board);

  //if there are no more empty slots - the board is filled.
  if (x === -1) {
    return board;
  }
  // for each valid possibility
  // add that number to the board and recurse.
  for (let num = 1; num <= 9; num += 1) {
    if (validChoice(board, x, y, num)) {
      board[x][y] = num;
      solve(board);
    }
  }
  // if no solutions have been found thus far
  // remove the number.
  if (emptySlot(board)[0] !== -1) {
    board[x][y] = 0;
  }
  // go back in time
  return board;
}

module.exports = {
  generateBoardSeed,
  inDifficultyRange,
  solve,
  generateUnique,
  findEmpties,
  deepClone,
};
