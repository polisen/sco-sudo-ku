const getRandom = () => Math.floor(Math.random() * 9);

const getRandomTuple = () => [getRandom(), getRandom()];


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

function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function getInitialQuadrantInformation() {
    const board = [];
    for (let i = 0; i < 9; i += 1) {
      if ([0, 4, 8].includes(i)) {
        board.push(shuffleArray(Array.from(Array(9), (e, index) => index + 1)));
      } else {
        const zeroArray = new Array(9).fill(0);
        board.push(zeroArray);
      }
    }
    return board;
  }


module.exports = {
    getInitialQuadrantInformation,
    inDifficultyRange,
    getRandomTuple
}