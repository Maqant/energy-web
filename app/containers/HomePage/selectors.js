import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

const makeSelectStartDate = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.dates.startDate,
  );

const makeSelectEndDate = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.dates.endDate,
  );

const makeSelectValues = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.dates.values,
  );

const makeSelectTrainedModels = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.options,
  );

const makeSelectHandleModelChange = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.currentModel,
  );

/* const makeSelectHandleModelChangeDefault = () =>
  createSelector(
    makeSelectHandleModelChange(),
    currentModel => {
      let lastProperty;
      for (lastProperty in currentModel);
      return lastProperty;
    },
  ); */

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectStartDate,
  makeSelectEndDate,
  makeSelectValues,
  makeSelectTrainedModels,
  makeSelectHandleModelChange,
};
