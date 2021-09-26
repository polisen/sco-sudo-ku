const inDifficultyRange = (difficulty, n) => {
  switch (difficulty) {
    case "easy":
      if (n >= 28 && n < 37) return true;
      break;
    case "medium":
      if (n >= 37 && n < 45) return true;
      break;
    case "hard":
      if (n > 45) return true;
      break;
    default:
      return false;
  }
  return false;
};

function shuffle(array) {
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

function getInitialQuadrantInformation() {
  const board = [];
  for (let i = 0; i < 9; i += 1) {
    if ([0, 4, 8].includes(i)) {
      board.push(shuffle(Array.from(Array(9), (e, index) => index + 1)));
    } else {
      const zeroArray = new Array(9).fill(0);
      board.push(zeroArray);
    }
  }
  // console.debug(board);
  return board;
}

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

const getRandom = () => Math.floor(Math.random() * 9);

const getRandomTuple = () => [getRandom(), getRandom()];

const deepClone = (matrix) => matrix.map((arr) => [...arr]);

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

function checkUniqueness(originalBoard, mutatingBoard) {
  const [x, y] = getRandomTuple();

  mutatingBoard[x][y] = 0;
  const reversedBoard = deepClone(mutatingBoard).reverse();
  const reversedSolve = solve(reversedBoard);
  const returnedBoard = reversedSolve.reverse();
  const same = checkSameness(returnedBoard, originalBoard);
  if (same) {
    checkUniqueness(originalBoard, mutatingBoard);
  } else {
    // console.table(mutatingBoard);
  }
  return mutatingBoard;
}

function findEmptySlots(unique) {
  const emptyCoords = [];
  let amountEmpty = 0;
  unique.forEach((column, x) => {
    column.forEach((element, y) => {
      if (!element) {
        emptyCoords.push([x, y]);
        amountEmpty += 1;
      }
    });
  });

  return [amountEmpty, emptyCoords];
}


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

function solve(board) {
  const [x, y] = emptySlot(board);

  // console.debug([x, y]);
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
  checkUniqueness,
  deepClone,
  findEmptySlots,
};
