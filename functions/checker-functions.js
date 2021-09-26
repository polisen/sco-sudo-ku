const reduceNumber = (n) => Math.floor(n / 3) + 1;

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



function validChoice(board, col, row, num) {
  let indicator = true;
  // console.debug({board, col, row, num});
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

module.exports = {
  checkSameness,
  validChoice,
  whichQuadrant
}