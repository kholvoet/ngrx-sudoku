import {Action} from '@ngrx/store';
import {SubProblem} from './span';

export enum SudokuGameAction {
  IncrementTurn = '[SudokuIncrementTurn] IncrementTurn',
  ResetGame = '[SudokuResetGame] Rest Game',
  ShowInternals = '[SudokuShowInternal] Show Internals'
}

export class IncrementTurnAction implements Action {
  readonly type = SudokuGameAction.IncrementTurn;

  constructor(public payload: SubProblem[]) {}
}

export class ResetGameAction implements Action {
  readonly type = SudokuGameAction.ResetGame;
}

export class ShowInternalsAction implements Action {
  readonly type = SudokuGameAction.ShowInternals;

  constructor(public payload: boolean) {}
}

export type SudokuGameActionUnion = IncrementTurnAction | ResetGameAction | ShowInternalsAction;
