import { call, put, takeEvery } from "redux-saga/effects";
import * as CONST from "./actionTypes";
import * as ACT from "./actions";
import * as APIS from "helpers/backend_helper";
import { toast } from "react-toastify";



function* onRegisterUserWithEmail({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.postRegisterWithEmail, data);
    callback && callback(response)
    if (response.status === "failure") {
      return yield put(ACT.registerUserWithEmailFail(response.message));
    }
    yield put(ACT.registerUserWithEmailSuccess(response));
  } catch (error) {
    console.log(error, "<======error");
    yield put(ACT.registerUserWithEmailFail(error));
  }
}

function* registerSaga() {
  yield takeEvery(CONST.REGISTER_USER_WITH_EMAIL, onRegisterUserWithEmail);
  
}

export default registerSaga;
