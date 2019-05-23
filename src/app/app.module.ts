import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { SudokuCellComponent } from './components/sudoku-cell/sudoku-cell.component';
import { SudokuBoardComponent } from './components/sudoku-board/sudoku-board.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuCellComponent,
    SudokuBoardComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
