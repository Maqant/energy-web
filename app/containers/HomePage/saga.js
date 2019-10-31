import { /* take, call, */ select, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { makeSelectEndDate, makeSelectStartDate } from './selectors';
import {
  API_REQUEST_ASYNC,
  API_GET_MODELS,
  GET_ESTIMATION_REQUESTS,
  GET_ESTIMATION,
  GET_VALID_DATES,
} from './constants';
import {
  apiRequestSuccess,
  apiRequestFailure,
  apiGetModelsSuccess,
  apiGetModelsFailure,
  getEstimationRequestsSuccess,
  getEstimationRequestsFailure,
  getEstimationRequests,
  getEstimationSuccess,
  getEstimationFailure,
  getValidDatesSuccess,
  getValidDatesFailure,
} from './actions';

/* const sleep = ms =>
  new Promise(resolve => {
    setInterval(resolve, ms);
  }); */

function* sendApiRequest() {
  const startDate = yield select(makeSelectStartDate());
  const endDate = yield select(makeSelectEndDate());

  try {
    const { data } = yield axios.post('http://127.0.0.1:32413/estimate', {
      start: startDate,
      end: endDate,
    });
    // console.log('Api  data', data);
    const dates = data.datetime.map((timestamp, index) => ({
      day: new Date(timestamp / 1000000).toLocaleDateString(),
      time: new Date(timestamp / 1000000).toLocaleTimeString(),
      estimation: data.estimations[index],
    }));
    // console.log(dates);
    // const values = yield call(request, requestURL);
    yield put(apiRequestSuccess({ values: dates }));
    yield put(getEstimationRequests());
  } catch (err) {
    yield put(apiRequestFailure(err));
  }
}

function* requestEstimationRequests() {
  try {
    const { data } = yield axios.get(
      'http://127.0.0.1:32413/getEstimationRequests',
    );
    const estimationRequests = data.map(request => ({
      requestDateTime: new Date(request.requestDatetime).toLocaleDateString(),
      dateTimeStart: new Date(request.datetimeStart).toLocaleDateString(),
      dateTimeEnd: new Date(request.datetimeEnd).toLocaleDateString(),
      id: request.id,
    }));
    yield put(getEstimationRequestsSuccess(estimationRequests));
  } catch (error) {
    yield put(getEstimationRequestsFailure(error));
  }
}

function* requestEstimation(action) {
  try {
    const { data } = yield axios.post('http://127.0.0.1:32413/getEstimations', {
      id: action.estimationId,
    });
    yield put(getEstimationSuccess(data));
  } catch (error) {
    yield put(getEstimationFailure(error));
  }
}

function* requestValidDates() {
  try {
    const { data } = yield axios.get('http://127.0.0.1:32413/getValidEstDates');
    const validDates = {
      start: new Date(data.start).toLocaleDateString(),
      end: new Date(data.end).toLocaleDateString(),
    };
    yield put(getValidDatesSuccess(validDates));
  } catch (error) {
    yield put(getValidDatesFailure(error));
  }
}

function* apiGetModel() {
  const options = {
    trainedModels: [
      { key: 1, text: 'Trained_Model_v1.1', value: 'v1.1' },
      { key: 2, text: 'Trained_Model_v1.2', value: 'v1.2' },
      { key: 3, text: 'Trained_Model_v1.3', value: 'v1.3' },
      { key: 4, text: 'Trained_Model_v1.4', value: 'v1.4' },
      { key: 5, text: 'Trained_Model_v2.1', value: 'v2.1' },
    ],
  };
  try {
    // yield sleep(2400);
    yield put(apiGetModelsSuccess(options));
  } catch (err) {
    yield put(apiGetModelsFailure(err));
  }
}

export default function* watchApiRequest() {
  yield takeLatest(API_REQUEST_ASYNC, sendApiRequest);
  yield takeLatest(API_GET_MODELS, apiGetModel);
  yield takeLatest(GET_ESTIMATION_REQUESTS, requestEstimationRequests);
  yield takeLatest(GET_ESTIMATION, requestEstimation);
  yield takeLatest(GET_VALID_DATES, requestValidDates);
}
