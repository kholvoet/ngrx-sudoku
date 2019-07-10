import {Cell} from './cell';
import {initSpans, Span} from './span';

export interface Board {
    data: Cell[][];
    spans: Span[];
}

export function initBoard(problemSetup: (b: Cell[][]) => void = () => {}): Board {
    return {
        data: initData(problemSetup),
        spans: initSpans()
    };
}

function initData(problemSetup: (b: Cell[][]) => void): Cell[][] {
    const initValue = new Array(9);
    let i: number;
    for ( i = 0; i < 9; ++i ) {
        initValue[i] = i + 1;
    }
    const data: Cell[][] = [];
    let r: number;
    let c: number;
    for ( r = 0; r < 9; ++r ) {
        data[r] = [];
        for ( c = 0; c < 9; ++c ) {
            data[r][c] = {
                id: { row: r, col: c },
                values: [... initValue],
                readOnly: false
            };
        }
    }

    // setupEasy(data);
    problemSetup(data);

    return data;
}
