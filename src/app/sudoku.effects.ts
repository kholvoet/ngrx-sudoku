import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { SudokuActionTypes, SudokuActions } from './sudoku.actions';


@Injectable()
export class SudokuEffects {


  @Effect()
  loadSudokus$ = this.actions$.pipe(
    ofType(SudokuActionTypes.LoadSudokus),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<SudokuActions>) {}

}
