type Board = number[][];

const reduceNumber = (n: number) => Math.floor(n / 3) + 1;

/**
 * Takes coordinates and figures out which quadrant the number belongs to.
 * @param array - x,y coordinates
 * @returns which quadrant it is - counted vertically.
 */
export function whichQuadrant([x, y]: [number, number]): number {
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
 * This function takes the board and returns a 2d array of each quadrant remaining numbers.
 * @param board {Board} - the current board - in whichever state.
 * @returns board
 */

function getQuadrants(board: Board): Board {
  let quads: number[][] = [];
  board.forEach((col, index) => {
    col.forEach((el, idx) => {
      if (el && el >= 0 && el <= 9) {
        const quadIDX = whichQuadrant([index, idx]);
        if (!quads[quadIDX]) quads[quadIDX] = [];
        quads[quadIDX].push(el);
      }
    });
  });
  quads = quads.map((arr: number[]) => [...new Set(arr)]);
  console.debug({ quads });
  return quads;
}

function generate(board: Board = [[0]]): Board {
  getQuadrants(board);
  return board;
}

export default generate;
