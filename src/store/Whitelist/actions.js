import * as CONST from "./actionTypes";

export const postWhitelist = (data, callback) => {
  return {
    type: CONST.POST_WHITELIST,
    payload: { data, callback },
  };
};

export const postWhitelistFail = (payload) => {
  return {
    type: CONST.POST_WHITELIST_FAIL,
    payload: payload,
  };
};

export const postWhitelistuccess = (user) => {
  return {
    type: CONST.POST_WHITELIST_SUCCESS,
    payload: user,
  };
};
