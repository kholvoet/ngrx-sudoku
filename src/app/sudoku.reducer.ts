import {SudokuActions, SudokuActionTypes} from './sudoku.actions';
import {Cell} from './Cell';

export interface State {
  turn: number;
  board: Cell[][];
  spans: Span[];
}

export const initialState: State = {
  turn: 0,
  board: [],
  spans: []
};

export function reducer(state = initialState, action: SudokuActions): State {
  switch (action.type) {

    case SudokuActionTypes.LoadSudokus:
      return state;

    default:
      return state;
  }
}
