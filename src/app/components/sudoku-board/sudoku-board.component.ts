import {Component, Input} from '@angular/core';
import {Cell} from '../../cell';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'table[sudoku-board]',
    templateUrl: './sudoku-board.component.html',
    styleUrls: ['./sudoku-board.component.css']
})
export class SudokuBoardComponent {

    @Input()
    board: Cell[][];

    constructor() {
    }

    getCell(r, c) {
        return this.board[r][c];
    }
}
