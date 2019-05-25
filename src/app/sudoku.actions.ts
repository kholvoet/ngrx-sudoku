import {Action} from '@ngrx/store';
import {CellAddress} from './cell';
import {Span} from './span';


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
