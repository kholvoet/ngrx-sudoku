export enum CellValue {
  '_' = ' ',
  'ONE' = 1,
  'TWO' = 2,
  'THREE' = 3,
  'FOUR' = 4,
  'FIVE' = 5,
  'SIX' = 6,
  'SEVEN' = 7,
  'EIGHT' = 8,
  'NINE' = 9,
}

export class CellAddress {
  r: number;
  c: number;
}

export interface Cell {
  id: CellAddress;
  values: CellValue[];
  readOnly: boolean;
}
