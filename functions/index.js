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

/**
 * A function directly callable from the front end.
 * This is an express endpoint in disguise with added abstractions from google. thanks google.
 * 
 * Generate a filled sudoku board, remove numbers until I call it unique until there are enough empty
 * slots to fit the difficulty range. 
 * 
 * Return all the needed info about the generated game.
 * 
 * @return {board:number[][], solution: number[][], empty: boolean[][]}:
 * - board: a unique valid sudoku board represented in a 2d-array.
 * - solution: the solved board, i.e the solution.
 * - empty: a representation of which slots in the board are empty, 
 *          so that I can easily figure out if a slot should be editable or not.
 */
exports.getBoard = functions.https.onCall((data, context) => {
  let {difficulty} = data;
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

