import { setStartDate } from '../actions';
import { SET_START } from '../constants';

describe('HomePage actions', () => {
  describe('Set Start Date', () => {
    it('has a type of SET_START', () => {
      const expected = {
        type: SET_START,
      };
      expect(setStartDate()).toEqual(expected);
    });
  });
});
