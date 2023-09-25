import * as CONST from "./actionTypes";

const initialState = {
  error: "",
  loading: false
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case CONST.REGISTER_USER_WITH_EMAIL:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case CONST.REGISTER_USER_WITH_EMAIL_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      };

    case CONST.REGISTER_USER_WITH_EMAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      
    default:
      return { ...state };
  }
};

export default signup;
