/*
 *
 * LoadDataPage reducer
 *
 */
import produce from 'immer';
import {
  LOAD_EXCEL,
  LOAD_EXCEL_SUCCESS,
  LOAD_EXCEL_FAILURE,
} from './constants';

export const initialState = {
  isPending: false,
};

/* eslint-disable default-case, no-param-reassign */
const loadDataPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_EXCEL:
        draft.isPending = true;
        break;
      case LOAD_EXCEL_SUCCESS:
        draft.excelData = action.dataTable;
        draft.isPending = false;
        break;
      case LOAD_EXCEL_FAILURE:
        draft.error = action.error;
        draft.isPending = false;
        break;
    }
  });

export default loadDataPageReducer;
