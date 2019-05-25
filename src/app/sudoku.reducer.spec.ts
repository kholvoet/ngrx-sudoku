import {turnReducer} from './sudoku.reducer';

describe('Sudoku Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = turnReducer(0, action);

      expect(result).toBe(0);
    });
  });
});
