import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SudokuState} from '../../sudoku.reducer';
import {Cell} from '../../cell';

@Component({
  selector: 'table[sudoku-board]',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.css']
})
export class SudokuBoardComponent implements OnInit {

  @Input()
  board: Cell[][];

  constructor(private store: Store<SudokuState>) {
  }

  ngOnInit() {
  }

  getCell(r, c) {
    return this.board[r][c];
  }
}
