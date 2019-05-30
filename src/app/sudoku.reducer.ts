import {IncrementTurnAction, SudokuGameAction, SudokuGameActionUnion} from './sudoku.actions';
import {Span, SubProblem} from './span';
import {Cell, CellAddress, CellValue} from './cell';


export interface Board {
  data: Cell[][];
  spans: Span[];
}

export interface SudokuState {
  board: Board;
  subProblems: SubProblem[];
  turn: number;
}

function emptySpan(newId: number): Span {
  return {
    id: newId,
    cellIds: [],
    unsolvedSubProblems: [],
  };
}

function powerSetSorted(s) {
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
  let spanId = 0;

  // init row and col spans
  for (x = 0; x < 9; ++x) {
    const rowSpan: Span = emptySpan(spanId++);
    const colSpan: Span = emptySpan(spanId++);

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
      const patchSpan: Span = emptySpan(spanId++);

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

function initSubProblems(spans: Span[]): SubProblem[] {
  let newProblemId = 0;
  const subProblems: SubProblem[] = [];
  spans.forEach(span => {
    span.unsolvedSubProblems.forEach(usp =>
      subProblems.push({
        problemId: newProblemId++,
        spanId: span.id,
        problemCells: usp
      })
    );
  });
  return subProblems;
}

function initBoard(): Board {
  return {
    data: initData(),
    spans: initSpans()
  };
}

function setupEasy(b: Cell[][]) {
  b[0][0].values = [CellValue.THREE];
  b[0][5].values = [CellValue.FIVE];
  b[0][7].values = [CellValue.TWO];
  b[0][8].values = [CellValue.SEVEN];

  b[1][1].values = [CellValue.FOUR];
  b[1][2].values = [CellValue.EIGHT];
  b[1][3].values = [CellValue.ONE];
  b[1][7].values = [CellValue.SIX];

  b[2][0].values = [CellValue.SIX];
  b[2][1].values = [CellValue.TWO];

  b[3][4].values = [CellValue.EIGHT];
  b[3][5].values = [CellValue.FOUR];

  b[4][2].values = [CellValue.SEVEN];
  b[4][3].values = [CellValue.SIX];
  b[4][5].values = [CellValue.THREE];
  b[4][7].values = [CellValue.NINE];

  b[5][1].values = [CellValue.THREE];
  b[5][4].values = [CellValue.ONE];
  b[5][6].values = [CellValue.FIVE];
  b[5][7].values = [CellValue.EIGHT];

  b[6][7].values = [CellValue.FOUR];

  b[7][1].values = [CellValue.SIX];
  b[7][2].values = [CellValue.NINE];
  b[7][3].values = [CellValue.THREE];
  b[7][4].values = [CellValue.FOUR];
  b[7][6].values = [CellValue.TWO];
  b[7][7].values = [CellValue.FIVE];

  b[8][0].values = [CellValue.EIGHT];
  b[8][2].values = [CellValue.FOUR];
  b[8][3].values = [CellValue.TWO];
  b[8][5].values = [CellValue.SIX];
  b[8][7].values = [CellValue.THREE];
  b[8][8].values = [CellValue.NINE];
}

function setupHard(b: Cell[][]) {
  b[0][1].values = [CellValue.ONE];
  b[0][2].values = [CellValue.FIVE];
  b[0][3].values = [CellValue.THREE];
  b[0][8].values = [CellValue.SEVEN];

  b[1][6].values = [CellValue.SIX];
  b[1][7].values = [CellValue.EIGHT];
  b[1][8].values = [CellValue.ONE];

  b[2][5].values = [CellValue.SEVEN];

  b[3][0].values = [CellValue.TWO];
  b[3][1].values = [CellValue.EIGHT];
  b[3][4].values = [CellValue.THREE];

  b[4][1].values = [CellValue.NINE];
  b[4][2].values = [CellValue.SEVEN];
  b[4][6].values = [CellValue.FOUR];
  b[4][7].values = [CellValue.SIX];


  b[5][4].values = [CellValue.NINE];
  b[5][7].values = [CellValue.SEVEN];
  b[5][8].values = [CellValue.TWO];

  b[6][3].values = [CellValue.EIGHT];

  b[7][0].values = [CellValue.ONE];
  b[7][1].values = [CellValue.FOUR];
  b[7][2].values = [CellValue.SIX];

  b[8][0].values = [CellValue.SEVEN];
  b[8][5].values = [CellValue.FOUR];
  b[8][6].values = [CellValue.FIVE];
  b[8][7].values = [CellValue.NINE];
}

function setupExtremelyHard(b: Cell[][]) {
  // https://www.sudoku9x9.com/howtosolve_expert.php
  // id: 274341511
  b[0][4].values = [CellValue.TWO];

  b[1][2].values = [CellValue.THREE];
  b[1][3].values = [CellValue.ONE];
  b[1][6].values = [CellValue.SEVEN];

  b[2][0].values = [CellValue.FOUR];
  b[2][5].values = [CellValue.SIX];
  b[2][6].values = [CellValue.EIGHT];

  b[3][5].values = [CellValue.SEVEN];
  b[3][8].values = [CellValue.NINE];

  b[4][0].values = [CellValue.TWO];
  b[4][3].values = [CellValue.SIX];
  b[4][6].values = [CellValue.THREE];


  b[5][2].values = [CellValue.FOUR];
  b[5][3].values = [CellValue.EIGHT];
  b[5][4].values = [CellValue.ONE];
  b[5][8].values = [CellValue.SIX];

  b[6][2].values = [CellValue.NINE];
  b[6][3].values = [CellValue.FIVE];
  b[6][7].values = [CellValue.SEVEN];

  b[7][1].values = [CellValue.TWO];
  b[7][6].values = [CellValue.SIX];

  b[8][0].values = [CellValue.ONE];
  b[8][5].values = [CellValue.EIGHT];
  b[8][6].values = [CellValue.NINE];
  b[8][8].values = [CellValue.FOUR];
}


function initData(): Cell[][] {
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
      data[r][c] = {
        id: {row: r, col: c},
        values: [...initValue],
        readOnly: false
      };
    }
  }

  // setupEasy(data);
  setupExtremelyHard(data);

  return data;
}

function setSize<T>(s: Set<T>): number {
  return Array.from(s).length;
}

const newSpans = initSpans();
const newSubProblems = initSubProblems(newSpans);

function getComplementToProblem(cellIds: CellAddress[], span: Span): CellAddress[] {
  return span.cellIds.filter(x => {
    let found = false;
    cellIds.forEach(y => found = found || (x.row === y.row && x.col === y.col));
    return !found;
  });
}

function possibleCellValues(cellId: CellAddress, b: Cell[][]): CellValue[] {
  return b[cellId.row][cellId.col].values;
}

function getProblemPossibleValues(cellIds: Set<CellAddress>, b: Cell[][]): CellValue[] {
  const pv = [];
  cellIds.forEach(c => pv.push(...possibleCellValues(c, b)));
  return Array.from(new Set(pv).values());
}

// Fix thi: Remove subProblem possible vales from each compliment cell value...
function removeElements(elements: CellValue[], cellAddresses: CellAddress[], board: Cell[][]): void {
  const valuesToRemove = new Set();
  elements.forEach(e => valuesToRemove.add(e));

  return [...cellAddresses].forEach(x => {
    const valuesToFilter = Array.from(board[x.row][x.col].values);
    const filteredValues = [...valuesToFilter].filter(e => !valuesToRemove.has(e));

    board[x.row][x.col].values = filteredValues;
  });
}

export function boardReducer(state = initBoard(), action: SudokuGameActionUnion): Board {
  switch (action.type) {
    case SudokuGameAction.IncrementTurn:
      const solvedSupProblems: SubProblem[] = (action as IncrementTurnAction).payload;

      const newData = JSON.parse(JSON.stringify(state.data));
      solvedSupProblems.forEach(a => {
        if (setSize(a.problemCells) !== 0 && setSize(a.problemCells) !== 9) {
          const aPrime = getComplementToProblem(Array.from(a.problemCells.values()), state.spans[a.spanId]);
          const problemPossibleValues: CellValue[] = getProblemPossibleValues(a.problemCells, newData);
          removeElements(problemPossibleValues, aPrime, newData);
        }
      });
      return {
        ...state,
        data: newData
      };
    case SudokuGameAction.ResetGame:
      return initBoard();
    default:
      return state;
  }
}

export function subProblemsReducer(state = newSubProblems, action: SudokuGameActionUnion): SubProblem[] {
  switch (action.type) {
    case SudokuGameAction.IncrementTurn:
      const solvedSupProblems = new Set((action as IncrementTurnAction).payload);
      return state.filter(sp => !solvedSupProblems.has(sp));
    case SudokuGameAction.ResetGame:
      return newSubProblems;
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
