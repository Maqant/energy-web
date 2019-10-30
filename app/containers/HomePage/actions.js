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
