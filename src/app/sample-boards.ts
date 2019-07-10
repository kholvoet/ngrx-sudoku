import {Cell, CellValue} from './cell';

export function setupEasy(b: Cell[][]) {
    b[0][0].readOnly = true;
    b[0][0].values = [CellValue.THREE];
    b[0][5].readOnly = true;
    b[0][5].values = [CellValue.FIVE];
    b[0][7].readOnly = true;
    b[0][7].values = [CellValue.TWO];
    b[0][8].readOnly = true;
    b[0][8].values = [CellValue.SEVEN];
    b[1][1].readOnly = true;
    b[1][1].values = [CellValue.FOUR];
    b[1][2].readOnly = true;
    b[1][2].values = [CellValue.EIGHT];
    b[1][3].readOnly = true;
    b[1][3].values = [CellValue.ONE];
    b[1][7].readOnly = true;
    b[1][7].values = [CellValue.SIX];
    b[2][0].readOnly = true;
    b[2][0].values = [CellValue.SIX];
    b[2][1].readOnly = true;
    b[2][1].values = [CellValue.TWO];
    b[3][4].readOnly = true;
    b[3][4].values = [CellValue.EIGHT];
    b[3][5].readOnly = true;
    b[3][5].values = [CellValue.FOUR];
    b[4][2].readOnly = true;
    b[4][2].values = [CellValue.SEVEN];
    b[4][3].readOnly = true;
    b[4][3].values = [CellValue.SIX];
    b[4][5].readOnly = true;
    b[4][5].values = [CellValue.THREE];
    b[4][7].readOnly = true;
    b[4][7].values = [CellValue.NINE];
    b[5][1].readOnly = true;
    b[5][1].values = [CellValue.THREE];
    b[5][4].readOnly = true;
    b[5][4].values = [CellValue.ONE];
    b[5][6].readOnly = true;
    b[5][6].values = [CellValue.FIVE];
    b[5][7].readOnly = true;
    b[5][7].values = [CellValue.EIGHT];
    b[6][7].readOnly = true;
    b[6][7].values = [CellValue.FOUR];
    b[7][1].readOnly = true;
    b[7][1].values = [CellValue.SIX];
    b[7][2].readOnly = true;
    b[7][2].values = [CellValue.NINE];
    b[7][3].readOnly = true;
    b[7][3].values = [CellValue.THREE];
    b[7][4].readOnly = true;
    b[7][4].values = [CellValue.FOUR];
    b[7][6].readOnly = true;
    b[7][6].values = [CellValue.TWO];
    b[7][7].readOnly = true;
    b[7][7].values = [CellValue.FIVE];
    b[8][0].readOnly = true;
    b[8][0].values = [CellValue.EIGHT];
    b[8][2].readOnly = true;
    b[8][2].values = [CellValue.FOUR];
    b[8][3].readOnly = true;
    b[8][3].values = [CellValue.TWO];
    b[8][5].readOnly = true;
    b[8][5].values = [CellValue.SIX];
    b[8][7].readOnly = true;
    b[8][7].values = [CellValue.THREE];
    b[8][8].readOnly = true;
    b[8][8].values = [CellValue.NINE];
}

function setupHard(b: Cell[][]) {
    b[0][1].values = [CellValue.ONE];
    b[0][2].values = [CellValue.FIVE];
    b[0][3].values = [CellValue.THREE];
    b[0][8].values = [CellValue.SEVEN];

    b[1][6].values = [CellValue.SIX];
    b[1][7].values = [CellValue.EIGHT];
    b[1][8].values = [CellValue.ONE];

    b[2][5].values = [CellValue.SEVEN];

    b[3][0].values = [CellValue.TWO];
    b[3][1].values = [CellValue.EIGHT];
    b[3][4].values = [CellValue.THREE];

    b[4][1].values = [CellValue.NINE];
    b[4][2].values = [CellValue.SEVEN];
    b[4][6].values = [CellValue.FOUR];
    b[4][7].values = [CellValue.SIX];


    b[5][4].values = [CellValue.NINE];
    b[5][7].values = [CellValue.SEVEN];
    b[5][8].values = [CellValue.TWO];

    b[6][3].values = [CellValue.EIGHT];

    b[7][0].values = [CellValue.ONE];
    b[7][1].values = [CellValue.FOUR];
    b[7][2].values = [CellValue.SIX];

    b[8][0].values = [CellValue.SEVEN];
    b[8][5].values = [CellValue.FOUR];
    b[8][6].values = [CellValue.FIVE];
    b[8][7].values = [CellValue.NINE];
}

export function setupExtremelyHard(b: Cell[][]) {
    // https://www.sudoku9x9.com/howtosolve_expert.php
    // id: 274341511
    b[0][4].values = [CellValue.TWO];

    b[1][2].values = [CellValue.THREE];
    b[1][3].values = [CellValue.ONE];
    b[1][6].values = [CellValue.SEVEN];

    b[2][0].values = [CellValue.FOUR];
    b[2][5].values = [CellValue.SIX];
    b[2][6].values = [CellValue.EIGHT];

    b[3][5].values = [CellValue.SEVEN];
    b[3][8].values = [CellValue.NINE];

    b[4][0].values = [CellValue.TWO];
    b[4][3].values = [CellValue.SIX];
    b[4][6].values = [CellValue.THREE];

    b[5][2].values = [CellValue.FOUR];
    b[5][3].values = [CellValue.EIGHT];
    b[5][4].values = [CellValue.ONE];
    b[5][8].values = [CellValue.SIX];

    b[6][2].values = [CellValue.NINE];
    b[6][3].values = [CellValue.FIVE];
    b[6][7].values = [CellValue.SEVEN];

    b[7][1].values = [CellValue.TWO];
    b[7][6].values = [CellValue.SIX];

    b[8][0].values = [CellValue.ONE];
    b[8][5].values = [CellValue.EIGHT];
    b[8][6].values = [CellValue.NINE];
    b[8][8].values = [CellValue.FOUR];
}
