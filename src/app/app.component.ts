import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {SudokuState} from './sudoku.reducer';
import {Observable} from 'rxjs';
import {IncrementTurnAction} from './sudoku.actions';
import {Cell, CellAddress} from './cell';
import {Span} from './span';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx-sudoku';

  turn$: Observable<number>;
  board$: Observable<Cell[][]>;
  span$: Observable<Span[]>;

  solvedSubProblems: Set<CellAddress>[];
  private _unsolvedProblemCount = 0;

  constructor(private store: Store<SudokuState>) {
  }

  ngOnInit(): void {
    this.turn$ = this.store.pipe(select('turn'));
    this.board$ = this.store.pipe(select('board'));
    this.span$ = this.store.pipe(select('spans'));
    this.span$.subscribe(spans =>
      this.solvedSubProblems = this.collectSolvedProblems(spans)
    );
    this.span$.subscribe(spans =>
      this._unsolvedProblemCount = spans.map(s => s.unsolvedSubProblems.length).reduce((a, b) => a + b)
    );
  }

  collectSolvedProblems(spans: Span[]): Set<CellAddress> [] {
    let ssp = [];

    return ssp;
  }

  nextTurn(): void {
    this.store.dispatch(new IncrementTurnAction());
  }

  get unsolvedProblemCount(): number {
    return this._unsolvedProblemCount;
  }
}
