import {Component, Input, OnInit} from '@angular/core';
import {Board} from '../../board';
import {SubProblem} from '../../span';

@Component({
  selector: 'app-sudoku-internals',
  templateUrl: './sudoku-internals.component.html',
  styleUrls: ['./sudoku-internals.component.css']
})
export class SudokuInternalsComponent implements OnInit {

  @Input()
  board: Board;

  @Input()
  solvedSubProblems: SubProblem[];

  constructor() { }

  ngOnInit() {
  }

}
