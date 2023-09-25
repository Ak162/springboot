import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { GET_WALLETS,EDIT_WALLET,ADD_WALLET,DELETE_WALLET } from "./actionTypes";
import {addWalletFail, deleteWalletFail, editWalletFail, getWalletsFail , editWalletSuccess,getWalletsSuccess,addWalletSuccess,deleteWalletSuccess} from "./actions";
import {getWallets,editWallet,addWallet,deleteWallet } from "helpers/backend_helper";


function* onGetWallets({ payload: { user, callback } }) {
  try {
    const response = yield call(getWallets, user);
    if (response.status === "failure") {
      return yield put(getWalletsFail(response.message));
    }

    yield put(getWalletsSuccess(response));
    callback && callback(response);
  } catch (error) {
    yield put(getWalletsFail(error));
  }
}

function* onDeleteWallet({ payload: { user, callback } }) {
  try {
    const response = yield call(deleteWallet, user);
    if (response.status === "failure") {
      return yield put(deleteWalletFail(response.message));
    }

    yield put(deleteWalletSuccess(response));
    callback && callback(response);
  } catch (error) {
    yield put(deleteWalletFail(error));
  }
}

function* onAddWallet({ payload: { user, callback } }) {
  try {
    const response = yield call(addWallet, user);
    callback && callback(response);
    if (response.status === "failure") {
      return yield put(addWalletFail(response.message));
    }
    yield put(addWalletSuccess(response));
  } catch (error) {
    yield put(addWalletFail(error));
  }
}

function* onEditWallet({ payload: { user, callback } }) {
  try {
    const response = yield call(editWallet, user);
    if (response.status === "failure") {
      return yield put(editWalletFail(response.message));
    }

    yield put(editWalletSuccess(response));
    callback && callback(response);
  } catch (error) {
    yield put(editWalletFail(error));
  }
}



function* authSaga() {
  yield takeEvery(GET_WALLETS, onGetWallets);
  yield takeEvery(ADD_WALLET, onAddWallet);
  yield takeEvery(EDIT_WALLET, onEditWallet);
  yield takeEvery(DELETE_WALLET, onDeleteWallet); 
}

export default authSaga;;