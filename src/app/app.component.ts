import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {SudokuState} from './sudoku.reducer';
import {Observable} from 'rxjs';
import {IncrementTurnAction, ResetGameAction, ShowInternalsAction} from './sudoku.actions';
import {CellAddress, CellValue} from './cell';
import {SubProblem} from './span';
import {Board} from './board';
import {MatCheckboxChange} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ngrx-sudoku';

    turn$: Observable<number>;
    board$: Observable<Board>;
    unsolvedProblems$: Observable<SubProblem[]>;
    showInternals$: Observable<boolean>;

    solvedSubProblems: SubProblem[];
    remainingProblems = 0;
    board: Board;

    constructor(private store: Store<SudokuState>) {
    }

    ngOnInit(): void {
        this.turn$ = this.store.pipe(select('turn'));
        this.board$ = this.store.pipe(select('board'));
        this.unsolvedProblems$ = this.store.pipe(select('subProblems'));
        this.showInternals$ = this.store.pipe(select('showInternals'));

        this.board$.subscribe(board => this.board = board);

        this.unsolvedProblems$.subscribe(problems => {
            this.remainingProblems = problems.length;
            this.solvedSubProblems = problems.filter(problem => this.isSolved(problem.problemCells));
        });

    }

    isSolved(cells: CellAddress[]): boolean {
        const problemCells = new Set<CellAddress>(cells);
        let cellValues = new Set<CellValue>();
        const problemSize = Array.from(problemCells).length;
        problemCells.forEach(s => cellValues = new Set([
            ... Array.from(cellValues.values()), ... this.board.data[s.row][s.col].values
        ]));
        return cellValues.size === problemSize;
    }

    nextTurn(): void {
        this.store.dispatch(new IncrementTurnAction(this.solvedSubProblems));
    }

    resetGame(): void {
        this.store.dispatch(new ResetGameAction());
    }

    showInternals(event$: MatCheckboxChange): void {
        this.store.dispatch(new ShowInternalsAction(event$.checked));
    }

}
