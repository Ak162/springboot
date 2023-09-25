import * as CONST from "./actionTypes";

export const getProfile = (user, callback) => {
  return {
    type: CONST.GET_PROFILE,
    payload: { user, callback },
  };
};

export const getProfileFail = (payload) => {
  return {
    type: CONST.GET_PROFILE_FAIL,
    payload: payload,
  };
};

export const getProfileSuccess = (user) => {
  return {
    type: CONST.GET_PROFILE_SUCCESS,
    payload: user,
  };
};


export const updateProfile = (data, callback) => {
  return {
    type: CONST.UPDATE_PROFILE,
    payload: { data, callback },
  };
};

export const updateProfileFail = (payload) => {
  return {
    type: CONST.UPDATE_PROFILE_FAIL,
    payload: payload,
  };
};

export const updateProfileSuccess = (user) => {
  return {
    type: CONST.UPDATE_PROFILE_SUCCESS,
    payload: user,
  };
}

export const linkWallet = (data, callback) => {
  return {
    type: CONST.LINK_WALLET,
    payload: { data, callback },
  };
};

export const linkWalletFail = (payload) => {
  return {
    type: CONST.LINK_WALLET_FAIL,
    payload: payload,
  };
};

export const linkWalletSuccess = (user) => {
  return {
    type: CONST.LINK_WALLET_SUCCESS,
    payload: user,
  };
};

export const unlinkWallet = (data, callback) => {
  return {
    type: CONST.UNLINK_WALLET,
    payload: { data, callback },
  };
};

export const unlinkWalletFail = (payload) => {
  return {
    type: CONST.UNLINK_WALLET_FAIL,
    payload: payload,
  };
};

export const unlinkWalletSuccess = (user) => {
  return {
    type: CONST.UNLINK_WALLET_SUCCESS,
    payload: user,
  };
};

export const checkConnectWallet = () => {
  return {
    type: CONST.CHECK_CONNECT_WALLET,
  };
};

export const checkConnectWalletSuccess = (user) => {
  return {
    type: CONST.CHECK_CONNECT_WALLET_SUCCESS,
    payload: user,
  };
};