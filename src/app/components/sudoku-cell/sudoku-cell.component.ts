import {Component, Input, OnInit} from '@angular/core';
import {Cell} from '../../cell';

@Component({
  selector: 'td[sudoko-cell]',
  templateUrl: './sudoku-cell.component.html',
  styleUrls: ['./sudoku-cell.component.css']
})
export class SudokuCellComponent implements OnInit {

  @Input()
  cell: Cell;

  constructor() {
  }

  ngOnInit() {
  }

  get solved() {
    return this.cell.values.length === 1;
  }

  getData(r: number, c: number) {
    const value = (r * 3) + c + 1;
    // console.log(r, c, value );

    if (this.cell.values.includes(value)) {
      return value;
    }
    return '_';
  }

}
