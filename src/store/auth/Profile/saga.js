import { call, put, takeEvery } from "redux-saga/effects";
import * as CONST from "./actionTypes";
import * as ACT from "./actions";
import * as APIS from "helpers/backend_helper";
import { setUser } from "store/actions";
function* ongetProfile({ payload: { user } }) {
  try {
    const response = yield call(APIS.getProfile, user);
    if (response.status === "failure") {
      return yield put(ACT.getProfileFail(response.message));
    }
    yield put(ACT.getProfileSuccess(response));
    yield put(setUser(response));
  } catch (error) {
    console.log(error, "<======error");
    yield put(ACT.getProfileFail(error));
  }
}

function* onUpdateProfile({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.updateProfile, data);
    if (response.status === "failure") {
      return yield put(ACT.updateProfileFail(response.message));
    }
    callback && callback()
    yield put(ACT.updateProfileSuccess(response));
  } catch (error) {
    console.log(error, "<======error");
    yield put(ACT.updateProfileFail(error));
  }
}
function* onLinkWallet({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.linkWallet, data);
    console.log(response, "resp")
    callback && callback(response)
    if (response.status === "failure") {
      return yield put(ACT.linkWalletFail(response.message));
    }
    yield put(ACT.linkWalletSuccess(response));
  } catch (error) {
    console.log(error, "<======error");
    yield put(ACT.linkWalletFail(error));
  }
}

function* onUnlinkWallet({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.unlinkWallet, data);
    if (response.status === "failure") {
      return yield put(ACT.unlinkWalletFail(response.message));
    }
    callback && callback()
    yield put(ACT.unlinkWalletSuccess(response));
  } catch (error) {
    console.log(error, "<======error");
    yield put(ACT.unlinkWalletFail(error));
  }
}

function* onCheckConnectWallet() {
  yield put(ACT.checkConnectWalletSuccess());
}
function* profileSaga() {
  yield takeEvery(CONST.GET_PROFILE, ongetProfile);
  yield takeEvery(CONST.UPDATE_PROFILE, onUpdateProfile);
  yield takeEvery(CONST.LINK_WALLET, onLinkWallet);
  yield takeEvery(CONST.UNLINK_WALLET, onUnlinkWallet);
  yield takeEvery(CONST.CHECK_CONNECT_WALLET, onCheckConnectWallet);
}

export default profileSaga;
