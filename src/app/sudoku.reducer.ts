import {SudokuGameAction, SudokuGameActionUnion} from './sudoku.actions';
import {Span} from './span';
import {Cell} from './cell';

export interface SudokuState {
  turn: number;
  board: Cell[][];
  spans: Span[];
}

function emptySpan() {
  return {
    cellIds: [],
    unsolvedSubProblems: []
  };
}

function
powerSetSorted(s) {
  return (theArray => theArray.reduce(
      (subsets, value) => subsets.concat(subsets.map(set => [value, ...set])),
      [[]]
    )
  )(s).sort();

}

function initSpans(): Span[] {
  let x: number;
  let y: number;
  let spans: Span[] = [];

  // init row and col spans
  for (x = 0; x < 9; ++x) {
    const rowSpan: Span = emptySpan();
    const colSpan: Span = emptySpan();

    for (y = 0; y < 9; ++y) {
      rowSpan.cellIds = rowSpan.cellIds.concat({row: x, col: y});
      colSpan.cellIds = colSpan.cellIds.concat({row: y, col: x});

    }
    rowSpan.unsolvedSubProblems = powerSetSorted(rowSpan.cellIds);
    spans = spans.concat(rowSpan);

    colSpan.unsolvedSubProblems = powerSetSorted(colSpan.cellIds);
    spans = spans.concat(colSpan);
  }

  const patchDIM = Math.sqrt(9);

  // init patch spans
  for (x = 0; x < 9; x += patchDIM) {
    for (y = 0; y < 9; y += patchDIM) {
      let r: number;
      let c: number;
      const patchSpan: Span = emptySpan();

      for (r = x; r < x + patchDIM; ++r) {
        for (c = y; c < y + patchDIM; ++c) {
          patchSpan.cellIds = patchSpan.cellIds.concat({row: r, col: c});
        }
      }
      patchSpan.unsolvedSubProblems = powerSetSorted(patchSpan.cellIds);
      spans = spans.concat(patchSpan);
    }
  }
  return spans;
}

// export const initialState = {
//   turn: 0,
//   board: initBoard(),
//   spans: initSpans()
// };

function initBoard(): Cell[][] {
  const initValue = new Array(9);
  let i: number;
  for (i = 0; i < 9; ++i) {
    initValue[i] = i + 1;
  }
  const data: Cell[][] = [];
  let r: number;
  let c: number;
  for (r = 0; r < 9; ++r) {
    data[r] = [];
    for (c = 0; c < 9; ++c) {
      if (r === 0) {
        data[r][c] = {
          id: {row: r, col: c},
          values: [ c + 1 ],
          readOnly: false
        };
      } else {
        data[r][c] = {
          id: {row: r, col: c},
          values: [...initValue],
          readOnly: false
        };
      }
    }
  }
  return data;
}

export function boardReducer(state = initBoard(), action: SudokuGameActionUnion): Cell[][] {
  switch (action.type) {
    default:
      return state;
  }
}

export function spansReducer(state = initSpans(), action: SudokuGameActionUnion): Span[] {
  switch (action.type) {
    default:
      return state;
  }
}

export function turnReducer(state = 0, action: SudokuGameActionUnion): number {
  switch (action.type) {
    case SudokuGameAction.IncrementTurn:
      return state + 1;
    case SudokuGameAction.ResetGame:
      return 0;
    default:
      return state;
  }
}
