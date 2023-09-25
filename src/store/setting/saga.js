import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { GET_SETTING } from "./actionTypes";
import { getSettingFail, getSettingSuccess } from "./actions";
import { getSettings } from "helpers/backend_helper";


function* onGetSettings({ payload: { user, callback } }) {
  try {
    const response = yield call(getSettings, user);
    if (response.status === "failure") {
      return yield put(getSettingFail(response.message));
    }

    yield put(getSettingSuccess(response));
    callback && callback();
  } catch (error) {
    yield put(getSettingFail(error));
  }
}



function* authSaga() {
  yield takeEvery(GET_SETTING, onGetSettings);

}

export default authSaga;
