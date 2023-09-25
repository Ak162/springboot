import { call, put, takeEvery } from "redux-saga/effects";
import * as CONST from "./actionTypes";
import * as ACT from "./actions";
import * as APIS from "helpers/backend_helper";

function* ongetCollection({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.getCollection, data);
    if (response.status === "failure") {
      return yield put(ACT.getCollectionFail(response.message));
    }

    yield put(ACT.getCollectionuccess(response));
    callback && callback();
  } catch (error) {
    yield put(ACT.getCollectionFail(error));
  }
}

function* collectionSaga() {
  yield takeEvery(CONST.GET_COLLECTION, ongetCollection);
}

export default collectionSaga;
