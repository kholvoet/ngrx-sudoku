import {Component, Input} from '@angular/core';
import {Cell} from '../../cell';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'td[sudoko-cell]',
    templateUrl: './sudoku-cell.component.html',
    styleUrls: ['./sudoku-cell.component.css']
})
export class SudokuCellComponent {

    @Input()
    cell: Cell;

    constructor() {
    }

    get solved() {
        return this.cell.values.length === 1;
    }

    getData(r: number, c: number) {
        const value = (r * 3) + c + 1;
        // console.log(r, c, value );

        if ( this.cell.values.includes(value) ) {
            return value;
        }
        return '_';
    }

}
