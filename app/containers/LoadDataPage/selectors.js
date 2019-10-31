import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loadDataPage state domain
 */

const selectLoadDataPageDomain = state => state.loadDataPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectIsPending = () =>
  createSelector(
    selectLoadDataPageDomain,
    substate => substate.isPending,
  );

/**
 * Default selector used by LoadDataPage
 */

const makeSelectLoadDataPage = () =>
  createSelector(
    selectLoadDataPageDomain,
    substate => substate,
  );

export default makeSelectLoadDataPage;
export { selectLoadDataPageDomain, makeSelectIsPending };
