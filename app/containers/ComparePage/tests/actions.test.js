import { loadExcel } from '../actions';
import { LOAD_EXCEL } from '../constants';

describe('ComparePage actions', () => {
  describe('Load Excel', () => {
    it('has a type of LOAD_EXCEL', () => {
      const expected = {
        type: LOAD_EXCEL,
      };
      expect(loadExcel()).toEqual(expected);
    });
  });
});
