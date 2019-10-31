/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  SET_START,
  SET_END,
  API_REQUEST_ASYNC,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  API_GET_MODELS_SUCCESS,
  API_GET_MODELS_FAILURE,
  CHANGE_MODEL,
  GET_ESTIMATION_REQUESTS_SUCCESS,
  GET_ESTIMATION_REQUESTS_FAILURE,
  GET_ESTIMATION,
  GET_ESTIMATION_SUCCESS,
  GET_ESTIMATION_FAILURE,
  GET_VALID_DATES_SUCCESS,
  GET_VALID_DATES_FAILURE,
} from './constants';

export const initialState = {
  dates: {
    startDate: '',
    endDate: '',
  },
  isPending: false,
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
      case API_REQUEST_ASYNC:
        draft.isPending = true;
        break;
      case API_REQUEST_SUCCESS:
        draft.dates.values = action.data.values;
        draft.isPending = false;
        break;
      case API_GET_MODELS_SUCCESS:
        draft.options = action.data.trainedModels;
        draft.currentModel = draft.options[4].value;
        draft.isPending = false;
        break;
      case API_GET_MODELS_FAILURE:
        /* console.log(action.error); */
        draft.isPending = false;
        break;
      case API_REQUEST_FAILURE:
        /* console.log(action.error); */
        draft.isPending = false;
        break;
      case CHANGE_MODEL:
        draft.currentModel = action.data;
        break;
      case GET_ESTIMATION_REQUESTS_SUCCESS:
        draft.estimationRequests = action.data;
        draft.isPending = false;
        break;
      case GET_ESTIMATION_REQUESTS_FAILURE:
        draft.error = action.error;
        draft.isPending = false;
        break;
      case GET_ESTIMATION:
        draft.isPending = true;
        break;
      case GET_ESTIMATION_SUCCESS:
        draft.dates.values = action.estimationData.map(data => ({
          consumption: data.Consumption,
          day: new Date(data.datetime).toLocaleDateString(),
          time: new Date(data.datetime).toLocaleTimeString(),
          estimation: data.estimation,
        }));
        draft.isPending = false;
        break;
      case GET_ESTIMATION_FAILURE:
        draft.error = action.error;
        draft.isPending = false;
        break;
      case GET_VALID_DATES_SUCCESS:
        draft.validDates = action.validDates;
        break;
      case GET_VALID_DATES_FAILURE:
        draft.validDateError = action.error;
        break;
    }
  });

export default homePageReducer;
