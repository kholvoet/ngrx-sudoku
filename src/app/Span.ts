import {CellAddress} from './Cell';

export class Span {
  cellIds: CellAddress[];
  unsolvedProblems: Set<CellAddress>[];
}

