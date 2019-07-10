import {CellAddress} from './cell';

export interface SubProblem {
    problemId: number;
    spanId: number;
    problemCells: CellAddress[];
}

export interface Span {
    id: number;
    cellIds: CellAddress[];
    unsolvedSubProblems: CellAddress[][];
    patchSpan?: boolean;
}

export function emptySpan(newId: number): Span {
    return {
        id: newId,
        cellIds: [],
        unsolvedSubProblems: [],
        patchSpan: false
    };
}

function powerSetSorted(s) {
    return (theArray => theArray.reduce(
            (subsets, value) => subsets.concat(subsets.map(set => [value, ... set])),
            [[]]
        )
    )(s).sort();
}

export function initSpans(): Span[] {
    let x: number;
    let y: number;
    let spans: Span[] = [];
    let spanId = 0;

    // init row and col spans
    for ( x = 0; x < 9; ++x ) {
        const rowSpan: Span = emptySpan(spanId++);
        const colSpan: Span = emptySpan(spanId++);

        for ( y = 0; y < 9; ++y ) {
            rowSpan.cellIds = rowSpan.cellIds.concat({ row: x, col: y });
            colSpan.cellIds = colSpan.cellIds.concat({ row: y, col: x });

        }
        rowSpan.unsolvedSubProblems = powerSetSorted(rowSpan.cellIds);
        spans = spans.concat(rowSpan);

        colSpan.unsolvedSubProblems = powerSetSorted(colSpan.cellIds);
        spans = spans.concat(colSpan);
    }

    const patchDIM = Math.sqrt(9);

    // init patch spans
    for ( x = 0; x < 9; x += patchDIM ) {
        for ( y = 0; y < 9; y += patchDIM ) {
            let r: number;
            let c: number;
            const patchSpan: Span = emptySpan(spanId++);
            patchSpan.patchSpan = true;

            for ( r = x; r < x + patchDIM; ++r ) {
                for ( c = y; c < y + patchDIM; ++c ) {
                    patchSpan.cellIds = patchSpan.cellIds.concat({ row: r, col: c });
                }
            }
            patchSpan.unsolvedSubProblems = powerSetSorted(patchSpan.cellIds);
            spans = spans.concat(patchSpan);
        }
    }
    return spans;
}
