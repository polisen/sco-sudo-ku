const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const {
  generateBoardSeed,
  inDifficultyRange,
  solve,
  checkUniqueness,
  deepClone,
  findEmptySlots,
} = require("./utility");

exports.getBoard = functions.https.onCall(async (data, context) => {
  let difficulty = data.difficulty;
  const board = generateBoardSeed();
  let emptySlots = 0;
  let solved = [];
  let unique = [];

  while (!inDifficultyRange(difficulty, emptySlots)) {
    solved = solve(board);
    unique = checkUniqueness(deepClone(solved), deepClone(solved));
    [emptySlots] = findEmptySlots(unique);
  }

  return {board: unique, solution: solved};
});

