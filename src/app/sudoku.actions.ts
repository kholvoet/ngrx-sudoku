import { Action } from '@ngrx/store';

export enum SudokuActionTypes {
  LoadSudokus = '[Sudoku] Load Sudokus',
  
  
}

export class LoadSudokus implements Action {
  readonly type = SudokuActionTypes.LoadSudokus;
}


export type SudokuActions = LoadSudokus;
