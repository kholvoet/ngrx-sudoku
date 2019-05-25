import {CellAddress} from './cell';

export class Span {
  cellIds: CellAddress[];
  unsolvedSubProblems: Set<CellAddress>[];
}

