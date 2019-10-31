/*
 *
 * HomePage actions
 *
 */

import {
  SET_START,
  SET_END,
  API_REQUEST_ASYNC,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  API_GET_MODELS_SUCCESS,
  API_GET_MODELS_FAILURE,
  API_GET_MODELS,
  CHANGE_MODEL,
  GET_ESTIMATION_REQUESTS,
  GET_ESTIMATION_REQUESTS_SUCCESS,
  GET_ESTIMATION_REQUESTS_FAILURE,
  GET_ESTIMATION,
  GET_ESTIMATION_SUCCESS,
  GET_ESTIMATION_FAILURE,
  GET_VALID_DATES,
  GET_VALID_DATES_SUCCESS,
  GET_VALID_DATES_FAILURE,
} from './constants';

export function setStartDate(startDate) {
  return {
    type: SET_START,
    startDate,
  };
}

export function setEndDate(endDate) {
  return {
    type: SET_END,
    endDate,
  };
}

export function sendApiRequest(data) {
  return {
    type: API_REQUEST_ASYNC,
    data,
  };
}

export function apiRequestSuccess(data) {
  return {
    type: API_REQUEST_SUCCESS,
    data,
  };
}

export function apiRequestFailure(error) {
  return {
    type: API_REQUEST_FAILURE,
    error,
  };
}

export function apiGetModel() {
  return {
    type: API_GET_MODELS,
  };
}

export function apiGetModelsSuccess(data) {
  return {
    type: API_GET_MODELS_SUCCESS,
    data,
  };
}

export function apiGetModelsFailure(error) {
  return {
    type: API_GET_MODELS_FAILURE,
    error,
  };
}

export function changeModel(data) {
  return {
    type: CHANGE_MODEL,
    data,
  };
}

export function getEstimationRequests() {
  return {
    type: GET_ESTIMATION_REQUESTS,
  };
}

export function getEstimationRequestsSuccess(data) {
  return {
    type: GET_ESTIMATION_REQUESTS_SUCCESS,
    data,
  };
}

export function getEstimationRequestsFailure(error) {
  return {
    type: GET_ESTIMATION_REQUESTS_FAILURE,
    error,
  };
}

export function getEstimation(estimationId) {
  return {
    type: GET_ESTIMATION,
    estimationId,
  };
}

export function getEstimationSuccess(estimationData) {
  return {
    type: GET_ESTIMATION_SUCCESS,
    estimationData,
  };
}

export function getEstimationFailure(error) {
  return {
    type: GET_ESTIMATION_FAILURE,
    error,
  };
}

export function getValidDates() {
  return {
    type: GET_VALID_DATES,
  };
}

export function getValidDatesSuccess(validDates) {
  return {
    type: GET_VALID_DATES_SUCCESS,
    validDates,
  };
}

export function getValidDatesFailure(error) {
  return {
    type: GET_VALID_DATES_FAILURE,
    error,
  };
}
