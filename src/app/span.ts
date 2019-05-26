import {CellAddress} from './cell';

export interface SubProblem {
  problemId: number;
  spanId: number;
  problemCells: Set<CellAddress>;
}

export interface Span {
  cellIds: CellAddress[];
  unsolvedSubProblems: Set<CellAddress>[];
}

