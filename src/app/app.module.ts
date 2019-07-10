import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SudokuCellComponent} from './components/sudoku-cell/sudoku-cell.component';
import {SudokuBoardComponent} from './components/sudoku-board/sudoku-board.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {boardReducer, subProblemsReducer, turnReducer, showInternalsReducer} from './sudoku.reducer';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule
} from '@angular/material';
import { SudokuInternalsComponent } from './components/sudoku-internals/sudoku-internals.component';

@NgModule({
    declarations: [
        AppComponent,
        SudokuCellComponent,
        SudokuBoardComponent,
        SudokuInternalsComponent
    ],
    imports: [
        BrowserModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatCheckboxModule,
        StoreModule.forRoot({
            turn: turnReducer,
            board: boardReducer,
            subProblems: subProblemsReducer,
            showInternals: showInternalsReducer
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
