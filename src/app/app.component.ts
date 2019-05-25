import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {SudokuState} from './sudoku.reducer';
import {Observable} from 'rxjs';
import {IncrementTurnAction} from './sudoku.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx-sudoku';

  turn$: Observable<number>;

  constructor(private store: Store<SudokuState>) {
  }

  ngOnInit(): void {
    this.turn$ = this.store.pipe(select('turn'));
  }

  nextTurn(): void {
    this.store.dispatch(new IncrementTurnAction());
  }
}
