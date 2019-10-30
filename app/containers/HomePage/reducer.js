/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  SET_START,
  SET_END,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  API_GET_MODELS_SUCCESS,
  API_GET_MODELS_FAILURE,
  CHANGE_MODEL,
} from './constants';

export const initialState = {
  dates: {
    startDate: '',
    endDate: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_START:
        draft.dates.startDate = action.startDate;
        break;
      case SET_END:
        draft.dates.endDate = action.endDate;
        break;
      case API_REQUEST_SUCCESS:
        draft.dates.values = action.data.values;
        break;
      case API_GET_MODELS_SUCCESS:
        draft.options = action.data.trainedModels;
        draft.currentModel = draft.options[4].value;
        break;
      case API_GET_MODELS_FAILURE:
        /* console.log(action.error); */
        break;
      case API_REQUEST_FAILURE:
        /* console.log(action.error); */
        break;
      case CHANGE_MODEL:
        draft.currentModel = action.data;
    }
  });

export default homePageReducer;
