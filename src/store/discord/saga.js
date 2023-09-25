import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as CONST from "./actionTypes";
import * as ACT from "./actions";
import * as APIS from "helpers/backend_helper";
import { toast } from "react-toastify";
import { loginSuccess } from "store/actions";
import { updateToken } from "helpers/api_helper";

function* ongetDiscordData({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.getDiscordDataApi, data);
    if (response.status === "failure") {
      toast.error(response.message);
      return yield put(ACT.getDiscordDataFail(response.message));
    }

    yield put(ACT.getDiscordDataSuccess(response));
    callback && callback(response.data);
  } catch (error) {
    toast.error("Internal Error!");
    yield put(ACT.getDiscordDataFail(error));
  }
}

function* ongetDiscordUserDataReq({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.getDiscordUserDataApi, data);
    callback && callback(response);
    if (response.status === "failure") {
      toast.error(response.message);
      return yield put(ACT.getDiscordUserDataFail(response.message));
    }
    yield put(ACT.getDiscordUserDataSuccess(response));
  } catch (error) {
     toast.error("Something went wrong!")
    yield put(ACT.getDiscordUserDataFail(error));
  }
}

function* onUnlinkDiscord({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.unlinkDiscord, data);
    callback && callback(response);
    if (response.status === "failure") {
      toast.error(response.message);
      return yield put(ACT.unlinkDiscordFail(response.message));
    }
    yield put(ACT.unlinkDiscordSuccess(response));
  } catch (error) {
     toast.error("Something went wrong!")
    yield put(ACT.unlinkDiscordFail(error));
  }
}



function* getDiscordLoginRedirectUrlReq({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.getDiscordLoginRedirectApi);
    if (response.status === "failure") {
      toast.error(response.message);
      return yield put(ACT.getDiscordLoginRedirectFail(response.message));
    }

    yield put(ACT.getDiscordLoginRedirectSuccess(response));
    callback && callback(response.data);
  } catch (error) {
    toast.error("Internal Error!");
    yield put(ACT.getDiscordLoginRedirectFail(error));
  }
}



function* postDiscordLoginReq({ payload: { data, callback } }) {
  try {
    const response = yield call(APIS.postDiscordLoginApi, data);
    if (response.status === "failure") {
      toast.error(response.message);
      return yield put(ACT.postDiscordLoginFail(response.message));
    }

    yield put(ACT.postDiscordLoginSuccess(response));
    yield put(loginSuccess(response));
    updateToken(response.data.Token);
    localStorage.setItem("authUser",JSON.stringify(response));
    callback && callback(response);
  } catch (error) {
    toast.error("Internal Error!");
    yield put(ACT.postDiscordLoginFail(error));
  }
}

function* discordDataSaga(){
  yield takeEvery(CONST.GET_DISCORD_DATA, ongetDiscordData);
  yield takeEvery(CONST.GET_DISCORD_USER_DATA, ongetDiscordUserDataReq);
  yield takeEvery(CONST.UNLINK_DISCORD, onUnlinkDiscord);
  yield takeLatest(CONST.GET_DISCORD_LOGIN_REDIRECT_REQUEST, getDiscordLoginRedirectUrlReq);
  yield takeLatest(CONST.POST_DISCORD_LOGIN_REQUEST, postDiscordLoginReq);  
}

export default discordDataSaga;
