import {CellAddress} from './cell';

export interface SubProblem {
  problemId: number;
  sp: number;
  problemCells: Set<CellAddress>;
}

export interface Span {
  id: number;
  cellIds: CellAddress[];
  unsolvedSubProblems: Set<CellAddress>[];
}

