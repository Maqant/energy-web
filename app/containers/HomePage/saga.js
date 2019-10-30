import { /* take, call, select, */ takeLatest, put } from 'redux-saga/effects';
// import { makeSelectEndDate, makeSelectStartDate } from './selectors';
import { API_REQUEST_ASYNC, API_GET_MODELS } from './constants';
import {
  apiRequestSuccess,
  apiRequestFailure,
  apiGetModelsSuccess,
  apiGetModelsFailure,
} from './actions';

const sleep = ms =>
  new Promise(resolve => {
    setInterval(resolve, ms);
  });
// Individual exports for testing
export function* sendApiRequest() {
  const requestData = {
    values: [
      {
        day: '2019-10-07',
        time: '00',
        consumption: 1576366.3715616176,
      },
      {
        day: '2019-10-07',
        time: '01',
        consumption: 1465386.2126431675,
      },
      {
        day: '2019-10-07',
        time: '02',
        consumption: 1404836.894337901,
      },
      {
        day: '2019-10-07',
        time: '03',
        consumption: 1389393.6511787507,
      },
      {
        day: '2019-10-07',
        time: '04',
        consumption: 1399027.3745661408,
      },
      {
        day: '2019-10-07',
        time: '05',
        consumption: 1432149.2799127288,
      },
      {
        day: '2019-10-07',
        time: '06',
        consumption: 1464446.997716482,
      },
      {
        day: '2019-10-07',
        time: '07',
        consumption: 1596550.4376094425,
      },
      {
        day: '2019-10-07',
        time: '08',
        consumption: 1966693.052020098,
      },
      {
        day: '2019-10-07',
        time: '09',
        consumption: 2162222.882813539,
      },
      {
        day: '2019-10-07',
        time: '10',
        consumption: 2263199.8787153093,
      },
      {
        day: '2019-10-07',
        time: '11',
        consumption: 2293027.9137287685,
      },
      {
        day: '2019-10-07',
        time: '12',
        consumption: 2135600.7826888557,
      },
      {
        day: '2019-10-07',
        time: '13',
        consumption: 2203060.8265918274,
      },
      {
        day: '2019-10-07',
        time: '14',
        consumption: 2210348.7417680416,
      },
      {
        day: '2019-10-07',
        time: '15',
        consumption: 2201559.184801061,
      },
      {
        day: '2019-10-07',
        time: '16',
        consumption: 2194235.340874114,
      },
      {
        day: '2019-10-07',
        time: '17',
        consumption: 2150924.0902783615,
      },
      {
        day: '2019-10-07',
        time: '18',
        consumption: 2220855.5684116925,
      },
      {
        day: '2019-10-07',
        time: '19',
        consumption: 2207628.0007746457,
      },
      {
        day: '2019-10-07',
        time: '20',
        consumption: 2114337.7395662614,
      },
      {
        day: '2019-10-07',
        time: '21',
        consumption: 2003050.815574353,
      },
      {
        day: '2019-10-07',
        time: '22',
        consumption: 1921045.8580435729,
      },
      {
        day: '2019-10-07',
        time: '23',
        consumption: 1797322.0135340802,
      },
      {
        day: '2019-10-08',
        time: '00',
        consumption: 1640534.0404320692,
      },
      {
        day: '2019-10-08',
        time: '01',
        consumption: 1519048.6193974568,
      },
      {
        day: '2019-10-08',
        time: '02',
        consumption: 1458224.4426877364,
      },
      {
        day: '2019-10-08',
        time: '03',
        consumption: 1440199.9783891942,
      },
      {
        day: '2019-10-08',
        time: '04',
        consumption: 1444581.6522242953,
      },
      {
        day: '2019-10-08',
        time: '05',
        consumption: 1457787.0395689816,
      },
      {
        day: '2019-10-08',
        time: '06',
        consumption: 1468622.5415936187,
      },
      {
        day: '2019-10-08',
        time: '07',
        consumption: 1568014.2315587678,
      },
      {
        day: '2019-10-08',
        time: '08',
        consumption: 1913123.7277286912,
      },
      {
        day: '2019-10-08',
        time: '09',
        consumption: 2105979.6425903854,
      },
      {
        day: '2019-10-08',
        time: '10',
        consumption: 2209443.946446105,
      },
      {
        day: '2019-10-08',
        time: '11',
        consumption: 2249560.2865337254,
      },
      {
        day: '2019-10-08',
        time: '12',
        consumption: 2137958.2262078924,
      },
      {
        day: '2019-10-08',
        time: '13',
        consumption: 2226682.7825739873,
      },
      {
        day: '2019-10-08',
        time: '14',
        consumption: 2251419.900521105,
      },
      {
        day: '2019-10-08',
        time: '15',
        consumption: 2221575.638726968,
      },
      {
        day: '2019-10-08',
        time: '16',
        consumption: 2188532.0843631933,
      },
      {
        day: '2019-10-08',
        time: '17',
        consumption: 2137080.0555440136,
      },
      {
        day: '2019-10-08',
        time: '18',
        consumption: 2235080.1831109975,
      },
      {
        day: '2019-10-08',
        time: '19',
        consumption: 2227941.064190711,
      },
      {
        day: '2019-10-08',
        time: '20',
        consumption: 2130345.9969441337,
      },
      {
        day: '2019-10-08',
        time: '21',
        consumption: 2042812.727881618,
      },
      {
        day: '2019-10-08',
        time: '22',
        consumption: 1949273.450663093,
      },
      {
        day: '2019-10-08',
        time: '23',
        consumption: 1818358.8716715665,
      },
    ],
  };
  try {
    yield sleep(2000);
    // const values = yield call(request, requestURL);
    yield put(apiRequestSuccess(requestData));
  } catch (err) {
    yield put(apiRequestFailure(err));
  }
}

export function* apiGetModel() {
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
    yield sleep(2400);
    yield put(apiGetModelsSuccess(options));
  } catch (err) {
    yield put(apiGetModelsFailure(err));
  }
}

export default function* watchApiRequest() {
  yield takeLatest(API_REQUEST_ASYNC, sendApiRequest);
  yield takeLatest(API_GET_MODELS, apiGetModel);
}
