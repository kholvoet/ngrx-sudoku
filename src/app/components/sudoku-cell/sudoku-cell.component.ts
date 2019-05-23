import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'td[sudoko-cell]',
  templateUrl: './sudoku-cell.component.html',
  styleUrls: ['./sudoku-cell.component.css']
})
export class SudokuCellComponent implements OnInit {

  @Input()
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {
  }

  ngOnInit() {
  }

  get solved() {
    return this.data.length === 1;
  }

  getData(r: number, c: number) {
    const value = (r * 3) + c + 1;
    // console.log(r, c, value );

    if (this.data.includes(value)) {
      return value;
    }
    return '_';
  }

}
