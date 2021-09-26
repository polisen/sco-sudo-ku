// take a guess
const reduceNumber = (n) => Math.floor(n / 3) + 1;

/**
 * Takes any 9x9 position and shoves it into a
 * 3x3 position, i.e the quadrants.
 *
 * Looks ugly but sort of performant.
 *
 * This can probably be done waaaaaay better.
 * @param {[number,number]} coordinates
 * @returns which quadrant.
 */
function whichQuadrant([x, y]) {
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
 * Check if the two boards are the same.
 * @param {number[][]} b1 - board
 * @param {number[][]} b2 . board
 * @returns boolean
 */

const checkSameness = function checkBoardSameness(b1, b2) {
  let condition = true;
  b1.every((col, xIdx) => {
    col.every((e, yIdx) => {
      if (b1[xIdx][yIdx] !== b2[xIdx][yIdx]) {
        condition = false;
        return condition;
      }
      return condition;
    });
    return condition;
  });
  return condition;
};

/**
 * This function takes the board and returns a 2d array of each quadrants numbers.
 * @param board {Board} - the current board - in whichever state.
 * @returns board
 */

function getQuadrants(board) {
  let quads = [];
  board.forEach((col, index) => {
    col.forEach((el, idx) => {
      if (el && el >= 0 && el <= 9) {
        const quadIDX = whichQuadrant([index, idx]);
        if (!quads[quadIDX]) quads[quadIDX] = [];
        quads[quadIDX].push(el);
      }
    });
  });
  quads = quads.map((arr) => [...new Set(arr)]);
  return quads;
}

/**
 * Checks wether or not a certain number in a certain position
 * is sudoku or not.
 * @param {number[][]} board - board.
 * @param {number} x - coordinate
 * @param {number} y - coordinate
 * @param {number} num - proposed number
 * @returns
 */
function validChoice(board, x, y, num) {
  let valid = true;
  // if the number is in column
  if (board[x].includes(num)) {
    valid = false;
  }
  // if the number is in the row
  board.every((c) => {
    if (c[y] === num) {
      valid = false;
    }
    return valid;
  });
  // if the number is in the quadrants
  // yes I generate a new representation for each check. fight me.
  // no but seriously this is obviously not smart.
  const quadrants = getQuadrants(board);
  const q = whichQuadrant([x, y]);
  if (quadrants[q] && quadrants[q].includes(num)) {
    valid = false;
  }

  return valid;
}

module.exports = {
  checkSameness,
  validChoice,
  whichQuadrant,
};
