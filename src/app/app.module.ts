import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SudokuCellComponent} from './components/sudoku-cell/sudoku-cell.component';
import {SudokuBoardComponent} from './components/sudoku-board/sudoku-board.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {boardReducer, subProblemsReducer, turnReducer} from './sudoku.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SudokuCellComponent,
    SudokuBoardComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      turn: turnReducer,
      board: boardReducer,
      subProblems: subProblemsReducer,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
