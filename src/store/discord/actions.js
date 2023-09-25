import * as CONST from "./actionTypes";

export const getDiscordData = (data, callback) => {
  return {
    type: CONST.GET_DISCORD_DATA,
    payload: { data, callback },
  };
};

export const getDiscordDataFail = (payload) => {
  return {
    type: CONST.GET_DISCORD_DATA_FAIL,
    payload: payload,
  };
};

export const getDiscordDataSuccess = (user) => {
  return {
    type: CONST.GET_DISCORD_DATA_SUCCESS,
    payload: user,
  };
};

export const getDiscordUserData = (data, callback) => {
  return {
    type: CONST.GET_DISCORD_USER_DATA,
    payload: { data, callback },
  };
};

export const getDiscordUserDataFail = (payload) => {
  return {
    type: CONST.GET_DISCORD_USER_DATA_FAIL,
    payload: payload,
  };
};

export const getDiscordUserDataSuccess = (user) => {
  return {
    type: CONST.GET_DISCORD_USER_DATA_SUCCESS,
    payload: user,
  };
};

export const unlinkDiscord = (data, callback) => {
  return {
    type: CONST.UNLINK_DISCORD,
    payload: { data, callback },
  };
};

export const unlinkDiscordFail = (payload) => {
  return {
    type: CONST.UNLINK_DISCORD_FAIL,
    payload: payload,
  };
};

export const unlinkDiscordSuccess = (user) => {
  return {
    type: CONST.UNLINK_DISCORD_SUCCESS,
    payload: user,
  };
};

//discord login 


export const getDiscordLoginRedirectRequest = (data, callback) => {
  return {
    type: CONST.GET_DISCORD_LOGIN_REDIRECT_REQUEST,
    payload: { data, callback },
  };
};

export const getDiscordLoginRedirectSuccess = (user) => {
  return {
    type: CONST.GET_DISCORD_LOGIN_REDIRECT_SUCCESS,
    payload: user,
  };
};



export const getDiscordLoginRedirectFail = (payload) => {
  return {
    type: CONST.GET_DISCORD_LOGIN_REDIRECT_FAIL,
    payload: payload,
  };
};


export const postDiscordLoginRequest = (data, callback) => {
  return {
    type: CONST.POST_DISCORD_LOGIN_REQUEST,
    payload: { data, callback },
  };
};

export const postDiscordLoginSuccess = (user) => {
  return {
    type: CONST.POST_DISCORD_LOGIN_SUCCESS,
    payload: user,
  };
};

export const postDiscordLoginFail = (payload) => {
  return {
    type: CONST.POST_DISCORD_LOGIN_FAIL,
    payload: payload,
  };
};

