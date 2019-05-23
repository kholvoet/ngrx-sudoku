import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SudokuEffects } from './sudoku.effects';

describe('SudokuEffects', () => {
  let actions$: Observable<any>;
  let effects: SudokuEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SudokuEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SudokuEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
