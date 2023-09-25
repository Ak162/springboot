import {
  GET_WALLETS,
  GET_WALLETS_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  GET_WALLETS_FAIL,
  ADD_WALLET,
  ADD_WALLET_SUCCESS,
  ADD_WALLET_FAIL,
  EDIT_WALLET,
  EDIT_WALLET_SUCCESS,
  EDIT_WALLET_FAIL,
  DELETE_WALLET,
  DELETE_WALLET_SUCCESS,
  DELETE_WALLET_FAIL
} from "./actionTypes";

export const getWallets = (user,callback) => {
  console.log('////getWallets',user)
  return {
    type: GET_WALLETS,
    payload: { user, callback },
  };
};


export const getWalletsFail = (payload) => {
  return {
    type: GET_WALLETS_FAIL,
    payload: payload,
  };
};

export const getWalletsSuccess = (user) => {
  return {
    type: GET_WALLETS_SUCCESS,
    payload: user,
  };
};

export const addWallet = (user, callback) => {
  console.log('/////user',user,'///callback')
  return {
    type: ADD_WALLET,
    payload: { user, callback },
  };
};

export const addWalletFail = (payload) => {
  return {
    type: ADD_WALLET_FAIL,
    payload: payload,
  };
};

export const addWalletSuccess = (user) => {
  return {
    type: ADD_WALLET_SUCCESS,
    payload: user,
  };
};

export const editWallet = (user, callback) => {
  return {
    type: EDIT_WALLET,
    payload: { user, callback },
  };
};

export const editWalletFail = (payload) => {
  return {
    type: EDIT_WALLET_FAIL,
    payload: payload,
  };
};

export const editWalletSuccess = (user) => {
  return {
    type: EDIT_WALLET_SUCCESS,
    payload: user,
  };
};
export const deleteWallet = (user, callback) => {
  return {
    type: DELETE_WALLET,
    payload: { user, callback },
  };
};

export const deleteWalletFail = (payload) => {
  return {
    type: DELETE_WALLET_FAIL,
    payload: payload,
  };
};

export const deleteWalletSuccess = (user) => {
  return {
    type: DELETE_WALLET_SUCCESS,
    payload: user,
  };
};
