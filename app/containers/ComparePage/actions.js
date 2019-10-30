/*
 *
 * ComparePage actions
 *
 */

import {
  LOAD_EXCEL_SUCCESS,
  LOAD_EXCEL,
  LOAD_EXCEL_FAILURE,
} from './constants';

export function loadExcel(event) {
  return {
    type: LOAD_EXCEL,
    event,
  };
}

export function loadExcelFailure(error) {
  return {
    type: LOAD_EXCEL_FAILURE,
    error,
  };
}

export function loadExcelSuccess(dataTable) {
  return {
    type: LOAD_EXCEL_SUCCESS,
    dataTable,
  };
}
