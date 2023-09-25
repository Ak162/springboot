import {
  GET_SETTING,
  GET_SETTING_SUCCESS,
  GET_SETTING_FAIL,
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,

  settings: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTING:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case GET_SETTING_SUCCESS:
      return {
        ...state,
        error: "",
        settings: action.payload.data,
        loading: false,
      };

    case GET_SETTING_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return { ...state };
  }
  return state;
};

export default login;
