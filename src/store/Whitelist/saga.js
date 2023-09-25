import { call, put, takeEvery } from "redux-saga/effects";
import * as CONST from "./actionTypes";
import * as ACT from "./actions";
import * as APIS from "helpers/backend_helper";

function* onpostWhitelist({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.postWhitelist);
    if (response.status === "failure") {
      return yield put(ACT.postWhitelistFail(response.message));
    }

    yield put(ACT.postWhitelistuccess(response));
    callback && callback();
  } catch (error) {
    yield put(ACT.postWhitelistFail(error));
  }
}

function* authSaga() {
  yield takeEvery(CONST.POST_WHITELIST, onpostWhitelist);
}

export default authSaga;
