import {SudokuGameAction, SudokuGameActionUnion} from './sudoku.actions';

export interface SudokuState {
  turn: number;
}

export const initialState = {
  turn: 0,
};

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
