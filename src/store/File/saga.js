import { call, put, takeEvery } from "redux-saga/effects";

// Customer Redux States
import { UPLOAD_FILE, POST_IPFS_FILE } from "./actionTypes";
import { apiFail } from "./actions";

import { postFile, postIpfsFile } from "helpers/backend_helper";

function* onAddFile({ payload: { data, callback } }) {
  try {
    const response = yield call(postFile, data);

    if (response.status == "failure") {
      return yield put(apiFail(response.message));
    }
    callback && callback(response);
    yield put(apiFail(""));
  } catch (error) {
    yield put(apiFail(error));
  }
}

function* onAddIpfsFile({ payload: { data, callback } }) {
  try {
    const response = yield call(postIpfsFile, data);

    callback && callback(response);
    if (response.status == "failure") {
      return yield put(apiFail(response.message));
    }
    yield put(apiFail(""));
  } catch (error) {
    callback && callback({ message: "Something went wrong...." });
    yield put(apiFail(error));
  }
}

function* fileSaga() {
  yield takeEvery(UPLOAD_FILE, onAddFile);
  yield takeEvery(POST_IPFS_FILE, onAddIpfsFile);
}

export default fileSaga;
