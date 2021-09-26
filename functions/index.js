const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const {
  generateBoardSeed,
  inDifficultyRange,
  solve,
  generateUnique,
  deepClone,
  findEmpties,
} = require("./board-operations");


exports.getBoard = functions.https.onCall(async (data, context) => {
  let difficulty = data.difficulty;
  const board = generateBoardSeed();
  let emptySlots = 0;
  let solved = [];
  let unique = [];
  let emptyCoords = [];

  while (!inDifficultyRange(difficulty, emptySlots)) {
    solved = solve(board);
    unique = generateUnique(deepClone(solved), deepClone(solved));
    [emptySlots, emptyCoords] = findEmpties(unique);
  }
  return {board: unique, solution: solved, empty: emptyCoords};
});

