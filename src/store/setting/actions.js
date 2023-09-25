import {
  GET_SETTING,
  GET_SETTING_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  GET_SETTING_FAIL,

} from "./actionTypes";

export const getSettings = (user, callback) => {
  return {
    type: GET_SETTING,
    payload: { user, callback },
  };
};


export const getSettingFail = (payload) => {
  return {
    type: GET_SETTING_FAIL,
    payload: payload,
  };
};

export const getSettingSuccess = (user) => {
  return {
    type: GET_SETTING_SUCCESS,
    payload: user,
  };
};
