const {
  generateBoardSeed,
  solve,
  emptySlot,
  generateUnique,
  findEmpties,
} = require("./board-operations");
const { checkSameness, validChoice } = require("./checker-functions");

test("tries to generate and solve a sudoku", () => {
  let board = generateBoardSeed();
  let solved = solve(board);
  let [x, y] = emptySlot(solved);
  expect(x).toBe(-1);
});

test("tries to generate a unique board and certify it.", () => {
  let board = generateBoardSeed();
  let solved = solve(board);
  let unique = generateUnique(solved, solved);
  let [amount, emptyCoords] = findEmpties(unique);
  expect(amount).toBeGreaterThan(0);
  let solvedUnique = solve(unique);
  let same = checkSameness(solved, solvedUnique);
  expect(same).toBeTruthy();
});



test("tests an invalid choice.", () => {
    let board = generateBoardSeed();
    let solved = solve(board);
    let valid = validChoice(solved, 3, 3, board[3][4])
    expect(valid).toBeFalsy();
  });
  