import * as CONST from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  connectWallet: false,
  userDetails: {}
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case CONST.GET_PROFILE:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case CONST.GET_PROFILE_SUCCESS:
      return {
        ...state,
        error: "",
        userDetails: action.payload.data,
        loading: false,
      };

    case CONST.GET_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CONST.UPDATE_PROFILE:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case CONST.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      };

    case CONST.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case CONST.LINK_WALLET:
        return {
          ...state,
          error: "",
          loading: true,
        };
      case CONST.LINK_WALLET_SUCCESS:
        return {
          ...state,
          error: "",
          loading: false,
        };
  
      case CONST.LINK_WALLET_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
        case CONST.UNLINK_WALLET:
          return {
            ...state,
            error: "",
            loading: true,
          };
        case CONST.UNLINK_WALLET_SUCCESS:
          return {
            ...state,
            error: "",
            loading: false,
          };
    
        case CONST.UNLINK_WALLET_FAIL:
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
          case CONST.CHECK_CONNECT_WALLET:
          return {
            ...state,
            error: "",
            loading: true,
          };
        case CONST.CHECK_CONNECT_WALLET_SUCCESS:
          return {
            ...state,
            error: "",
            loading: false,
            connectWallet: true
          };
    default:
      return { ...state };
  }
};

export default login;
