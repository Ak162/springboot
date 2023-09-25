import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
// Item Redux States
import {
  POST_MINT_ACTIVITY,
  GET_ITEMS,
  NFTS_RRC_TO_MAINBUCKET_REQUEST,
  GET_USER_MINTED_NFTS_COUNT_REQUEST
} from "./actionTypes";
import {
  postMintActivityFail,
  postMintActivitySuccess,
  getItemsFail,
  getItemsSuccess,
  postNftRrcToMainBucketFail,
  postNftRrcToMainBucketSuccess,
  getUserMintedNftsCountFail,
  getUserMintedNftsCountSuccess,
} from "./actions";

import {
  postMintActivity,
  getItems,
  postNftRrcToMainApi,
  getUserMintedNftsCountApi
} from "helpers/backend_helper";

function* onPostMintActivity({ payload: { data, callback } }) {
  try {
    const response = yield call(postMintActivity, data);

    if (response.status === "failure") {
      // toast.error(response.message);
      console.log("error",response.message);
      return yield put(postMintActivityFail(response.message));
    }

    yield put(postMintActivitySuccess(response));
    callback && callback();
  } catch (error) {
    console.log("error", error);
    yield put(postMintActivityFail(error));
  }
}


function* onGetItems({ payload: { data, callback } }) {
  try {
    const response = yield call(getItems, data);

    if (response.status === "failure") {
      toast.error(response.message);
      return yield put(getItemsFail(response.message));
    }

    yield put(getItemsSuccess(response));
    callback && callback();
  } catch (error) {
    console.log("error", error);
    yield put(getItemsFail(error));
  }
}


function* postNftRrcToMainBucketReq({ payload: { data, callback } }) {
  try {
    const response = yield call(postNftRrcToMainApi, data);
    if (response.status === "failure") {
      // toast.error(response.message);
      console.log("error",response.message);
      return yield put(postNftRrcToMainBucketFail(response.message));
    }
    yield put(postNftRrcToMainBucketSuccess(response));
    callback && callback(response.data);
  } catch (error) {
    console.log("error", error);
    yield put(postNftRrcToMainBucketFail(error));
  }
}


function* getUserMintedNftsCountReq({ payload: { data, callback } }) {
  try {
    const response = yield call(getUserMintedNftsCountApi, data);
    if (response.status === "failure") {
      callback && callback(false,response.message);
      return yield put(getUserMintedNftsCountFail(response.message));
    }
    callback && callback(true,response.totalCount);
    yield put(getUserMintedNftsCountSuccess(response));
  } catch (error) {
    console.log("error", error);
    callback && callback(false,"Internal Error");
    yield put(getUserMintedNftsCountFail(error));
  }
}

function* ItemsSaga() {
  yield takeEvery(POST_MINT_ACTIVITY, onPostMintActivity);
  yield takeEvery(GET_ITEMS, onGetItems);
  yield takeLatest(NFTS_RRC_TO_MAINBUCKET_REQUEST, postNftRrcToMainBucketReq);
  yield takeLatest(GET_USER_MINTED_NFTS_COUNT_REQUEST, getUserMintedNftsCountReq);
}

export default ItemsSaga;
