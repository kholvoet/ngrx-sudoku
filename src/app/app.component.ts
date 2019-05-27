import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {SudokuState} from './sudoku.reducer';
import {Observable} from 'rxjs';
import {IncrementTurnAction} from './sudoku.actions';
import {Cell, CellAddress, CellValue} from './cell';
import {SubProblem} from './span';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx-sudoku';

  turn$: Observable<number>;
  board$: Observable<Cell[][]>;
  unsolvedProblems$: Observable<SubProblem[]>;

  solvedSubProblems: SubProblem[];
  remaingProblems = 0;
  board: Cell[][];

  constructor(private store: Store<SudokuState>) {
  }

  ngOnInit(): void {
    this.turn$ = this.store.pipe(select('turn'));
    this.board$ = this.store.pipe(select('board'));
    this.unsolvedProblems$ = this.store.pipe(select('subProblems'));

    this.board$.subscribe(board => this.board = board);

    this.unsolvedProblems$.subscribe(problems => {
      this.remaingProblems = problems.length;
      this.solvedSubProblems = problems.filter(problem => this.isSolved(problem.problemCells));
    });
  }

  isSolved(problemCells: Set<CellAddress>): boolean {
    let cellValues = new Set<CellValue>();
    const problemSize = Array.from(problemCells).length;
    problemCells.forEach(s => cellValues = new Set([...Array.from(cellValues.values()), ...this.board[s.row][s.col].values]));
    return cellValues.size === problemSize;
  }

  nextTurn(): void {
    this.store.dispatch(new IncrementTurnAction(this.solvedSubProblems));
  }

  get unsolvedProblemCount(): number {
    return this.remaingProblems;
  }
}
