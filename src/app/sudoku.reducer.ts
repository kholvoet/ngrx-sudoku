import {IncrementTurnAction, ShowInternalsAction, SudokuGameAction, SudokuGameActionUnion} from './sudoku.actions';
import {initSpans, Span, SubProblem} from './span';
import {Cell, CellAddress, CellValue} from './cell';
import {Board, initBoard} from './board';
import {setupExtremelyHard} from './sample-boards';

export interface SudokuState {
    board: Board;
    subProblems: SubProblem[];
    turn: number;
    showInternals: boolean;
}

function initSubProblems(spans: Span[]): SubProblem[] {
    let newProblemId = 0;
    const subProblems: SubProblem[] = [];
    spans.forEach(span => {
        span.unsolvedSubProblems.forEach(usp =>
            subProblems.push({
                problemId: newProblemId++,
                spanId: span.id,
                problemCells: usp
            })
        );
    });
    return subProblems;
}

function setSize<T>(s: Array<T>): number {
    return Array.from(new Set(s)).length;
}

const newSpans = initSpans();
const newSubProblems = initSubProblems(newSpans);

function getComplementToProblem(cellIds: CellAddress[], span: Span): CellAddress[] {
    return span.cellIds.filter(x => {
        let found = false;
        cellIds.forEach(y => found = found || (x.row === y.row && x.col === y.col));
        return !found;
    });
}

function possibleCellValues(cellId: CellAddress, b: Cell[][]): CellValue[] {
    return b[cellId.row][cellId.col].values;
}

function getProblemPossibleValues(cellIds: CellAddress[], b: Cell[][]): CellValue[] {
    const pv = [];
    (new Set(cellIds)).forEach(c => pv.push(... possibleCellValues(c, b)));
    return Array.from(new Set(pv).values());
}

// Fix this: Remove subProblem possible vales from each compliment cell value...
function removeElements(elements: CellValue[], cellAddresses: CellAddress[], board: Cell[][]): void {
    const valuesToRemove = new Set();
    elements.forEach(e => valuesToRemove.add(e));

    return [... cellAddresses].forEach(x => {
        const valuesToFilter = Array.from(board[x.row][x.col].values);
        board[x.row][x.col].values = [... valuesToFilter].filter(e => !valuesToRemove.has(e));
    });
}

function dataReducer(state: Board, action: SudokuGameActionUnion): Cell[][] {
    const solvedSupProblems: SubProblem[] = (action as IncrementTurnAction).payload;

    const newData = [... state.data];
    solvedSupProblems.forEach(a => {
        if ( setSize(a.problemCells) !== 0 && setSize(a.problemCells) !== 9 ) {
            const aPrime = getComplementToProblem(a.problemCells, state.spans[a.spanId]);
            const problemPossibleValues: CellValue[] = getProblemPossibleValues(a.problemCells, newData);
            removeElements(problemPossibleValues, aPrime, newData);
        }
    });
    return newData;
}

export function boardReducer(state = initBoard(setupExtremelyHard), action: SudokuGameActionUnion): Board {
    switch ( action.type ) {
        case SudokuGameAction.IncrementTurn:
            return {
                ... state,
                data: dataReducer(state, action)
            };
        case SudokuGameAction.ResetGame:
            return initBoard(setupExtremelyHard);
        default:
            return state;
    }
}

export function subProblemsReducer(state = newSubProblems, action: SudokuGameActionUnion): SubProblem[] {
    switch ( action.type ) {
        case SudokuGameAction.IncrementTurn:
            const solvedSupProblems = new Set((action as IncrementTurnAction).payload);
            return state.filter(sp => !solvedSupProblems.has(sp));
        case SudokuGameAction.ResetGame:
            return newSubProblems;
        default:
            return state;
    }
}

export function turnReducer(state = 0, action: SudokuGameActionUnion): number {
    switch ( action.type ) {
        case SudokuGameAction.IncrementTurn:
            return state + 1;
        case SudokuGameAction.ResetGame:
            return 0;
        default:
            return state;
    }
}

export function showInternalsReducer(state = false, action: SudokuGameActionUnion): boolean {
    if ( action.type === SudokuGameAction.ShowInternals ) {
        return (action as ShowInternalsAction).payload;
    }
    return state;
}
