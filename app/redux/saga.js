import {setSagaListData} from './action';
import {SAGALIST} from './constants';
import {all, call, put, takeEvery} from 'redux-saga/effects';

function callApi() {
  return fetch('https://mocki.io/v1/a2d54d32-17ed-418b-8a77-7b9c0949c513')
    .then(response => response.json())
    .catch(e => {
      return e;
    });
}
function* userSagaList() {
  const user = yield call(callApi);
  // console.log(JSON.stringify(user));
  yield put(setSagaListData(102));
}

export function* helloSaga() {
  console.log('Hello Sagas!');
}
function* watchUserSagaList() {
  yield takeEvery(SAGALIST, userSagaList);
}

function* sagaData() {
  yield all([watchUserSagaList(), helloSaga()]);
}

export default sagaData;
