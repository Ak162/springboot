import * as CONST from "./actionTypes";

export const registerUserWithEmail = (data, callback) => {
  return {
    type: CONST.REGISTER_USER_WITH_EMAIL,
    payload: { data, callback },
  };
};

export const registerUserWithEmailFail = (payload) => {
  return {
    type: CONST.REGISTER_USER_WITH_EMAIL_FAIL,
    payload: payload,
  };
};

export const registerUserWithEmailSuccess = (user) => {
  return {
    type: CONST.REGISTER_USER_WITH_EMAIL_SUCCESS,
    payload: user,
  };
}






