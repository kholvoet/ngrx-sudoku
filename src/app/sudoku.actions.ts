import {Action} from '@ngrx/store';

export enum SudokuGameAction {
  IncrementTurn = '[SudokuIncrementTurn] IncrementTurn',
  ResetGame = '[SudokuResetGame] Rest Game',
}

export class IncrementTurnAction implements Action {
  readonly type = SudokuGameAction.IncrementTurn;

}

export class ResetGameAction implements Action {
  readonly type = SudokuGameAction.ResetGame;
}

export type SudokuGameActionUnion = IncrementTurnAction | ResetGameAction;
