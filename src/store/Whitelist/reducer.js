import * as CONST from "./actionTypes";

const initialState = {
  error: "",
  loading: false,

};

const login = (state = initialState, action) => {
  switch (action.type) {
    case CONST.POST_WHITELIST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case CONST.POST_WHITELIST_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      };

    case CONST.POST_WHITELIST_FAIL:
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
