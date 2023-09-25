import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  LOGIN_USER_WITH_EMAIL,
  LOGIN_USER_WITH_EMAIL_SUCCESS,
  LOGIN_USER_WITH_EMAIL_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "./actionTypes";

export const loginUser = (user, callback) => {
  return {
    type: LOGIN_USER,
    payload: { user, callback },
  };
};

export const loginFail = (payload) => {
  return {
    type: LOGIN_FAIL,
    payload: payload,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const logoutUser = (navigate, role) => {
  return {
    type: LOGOUT_USER,
    payload: { navigate, role },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const loginUserWithEmail = (data,callback) => {
  console.log('inside action',data)
  return {
    type: LOGIN_USER_WITH_EMAIL,
    payload: { data, callback },
  };
};

export const loginUserWithEmailFail = (payload) => {
  return {
    type: LOGIN_USER_WITH_EMAIL_FAIL,
    payload: payload,
  };
};

export const loginUserWithEmailSuccess = (payload) => {
  console.log('//////payload',payload)
  return {
    type: LOGIN_USER_WITH_EMAIL_SUCCESS,
    payload: payload,
  };
};


//forgot password 


export const forgotPasswordRequest = (data,callback) => {
  return {
    type: USER_FORGOT_PASSWORD_REQUEST,
    payload: { data, callback },
  };
};


export const forgotPasswordSuccess = (payload) => {
  console.log('//////payload',payload)
  return {
    type: USER_FORGOT_PASSWORD_SUCCESS,
    payload: payload,
  };
};

export const forgotPasswordFail = (payload) => {
  return {
    type: USER_FORGOT_PASSWORD_FAIL,
    payload: payload,
  };
};



//reset password 


export const resetPasswordRequest = (data,callback) => {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: { data, callback },
  };
};


export const resetPasswordSuccess = (payload) => {
  console.log('//////payload',payload)
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: payload,
  };
};

export const resetPasswordFail = (payload) => {
  return {
    type: RESET_PASSWORD_FAIL,
    payload: payload,
  };
};
