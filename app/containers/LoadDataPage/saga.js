import { /* take, select, */ call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ExcelRenderer } from 'react-excel-renderer';
import { LOAD_EXCEL } from './constants';
import { loadExcelSuccess, loadExcelFailure } from './actions';

const loadFile = fileObj =>
  new Promise((resolve, reject) => {
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) reject(err);

      const responseArray = resp.rows.map(row => ({
        Date: row[0],
        Hour: row[1],
        Region: 'Toroslar',
        Consumption: row[2],
      }));
      const dataTable = { alldata: responseArray };
      resolve(dataTable);
    });
  });

function* loadExcel(action) {
  const fileObj = action.event.target.files[0];
  try {
    const dataTable = yield call(loadFile, fileObj);
    yield axios.post('http://127.0.0.1:32413/insert_data', dataTable);
    yield put(loadExcelSuccess(dataTable));
  } catch (err) {
    yield put(loadExcelFailure(err));
  }
}

// Individual exports for testing
export default function* loadDataPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_EXCEL, loadExcel);
}
