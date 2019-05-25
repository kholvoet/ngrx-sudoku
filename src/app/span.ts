import {CellAddress} from './cell';

export class Span {
  cellIds: CellAddress[];
  unsolvedProblems: Set<CellAddress>[];
}

