import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER ,LOGIN_USER_WITH_EMAIL, USER_FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST} from "./actionTypes";
import { forgotPasswordFail, forgotPasswordSuccess, loginFail, loginSuccess, loginUserWithEmailFail, loginUserWithEmailSuccess, logoutUserSuccess, resetPasswordFail, resetPasswordSuccess} from "./actions";
import { postForgotPasssordApi, postLogin,postLoginWithEmail, postResetPasssordApi } from "helpers/backend_helper";
import { updateToken } from "helpers/api_helper";
import { setUser } from "store/actions";
import { toast } from "react-toastify";

function* loginUser({ payload: { user, callback } }) {
  try {
    const response = yield call(postLogin, user);
    console.log("shdbshjdbhsd",response)
    if (response?.status === "failure") {
      toast.error(response.message);
      return yield put(loginFail(response.message));
    }
    
    yield put(loginSuccess(response));
    updateToken(response.data.Token);
    localStorage.setItem("authUser",JSON.stringify(response));
    callback && callback(response);
  } catch (error) {
    console.log("error",error)
    toast.error("Internal Error!");
    yield put(loginFail(error));
  }
}

function* logoutUser({ payload: { navigate, role } }) {
  try {
    localStorage.removeItem("authUser");
    yield put(logoutUserSuccess());
    window.location.replace("/");
    // navigate.push("/");
  } catch (error) {
    yield put(loginFail(error));
  }
}

function* onloginUserWithEmail({ payload: { data, callback } }) {
  try {
    const response = yield call(postLoginWithEmail, data);
    callback && callback(response);
    if (response.status === "failure") {
      return yield put(loginUserWithEmailFail(response.message));
    }
    updateToken(response.data.Token);
    console.log(response.data)
    localStorage.setItem("authUser",JSON.stringify(response));
    
    yield put(loginUserWithEmailSuccess(response));
  } catch (error) {
    yield put(loginUserWithEmailFail(error));
  }
}


function* forgotPasswordReq({ payload: { data, callback } }) {
  try {
    const response = yield call(postForgotPasssordApi, data);
    if (response.status === "failure") {
      toast.error(response.message)
      return yield put(forgotPasswordFail(response.message));
    }  
    yield put(forgotPasswordSuccess(response));
    toast.success("Please check your email inbox.");
    callback && callback(response);
  } catch (error) {
    toast.error("Internal Error!")
    yield put(forgotPasswordFail(error));
  }
}


function* resetPasswordReq({ payload: { data, callback } }) {
  try {
    const response = yield call(postResetPasssordApi, data);
    if (response.status === "failure") {
      toast.error(response.message)
      return yield put(resetPasswordFail(response.message));
    }    
    yield put(resetPasswordSuccess(response));
    toast.success("Reset password successfully.")
    console.log("response after reset password",response);
    callback && callback(response);
  } catch (error) {
    toast.error("Internal Error!")
    yield put(resetPasswordFail(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(LOGIN_USER_WITH_EMAIL ,onloginUserWithEmail);
  yield takeLatest(USER_FORGOT_PASSWORD_REQUEST, forgotPasswordReq);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordReq);
}

export default authSaga;
