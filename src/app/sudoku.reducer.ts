
import { SudokuActions, SudokuActionTypes } from './sudoku.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: SudokuActions): State {
  switch (action.type) {

    case SudokuActionTypes.LoadSudokus:
      return state;

    default:
      return state;
  }
}
