import * as CONST from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  discordUser : null,
};

const discordData = (state = initialState, action) => {
  switch (action.type) {
    case CONST.GET_DISCORD_DATA:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case CONST.GET_DISCORD_DATA_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
      };

    case CONST.GET_DISCORD_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case CONST.GET_DISCORD_USER_DATA:
        return {
          ...state,
          error: "",
          loading: false,
        };
      case CONST.GET_DISCORD_USER_DATA_SUCCESS:
        return {
          ...state,
          error: "",
          loading: false,
          discordUser: action.payload.data,
        };
  
      case CONST.GET_DISCORD_USER_DATA_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case CONST.UNLINK_DISCORD:
        return {
          ...state,
          error: "",
          loading: true,
        };
      case CONST.UNLINK_DISCORD_SUCCESS:
        return {
          ...state,
          error: "",
          loading: false,
          discordUser: action.payload.data,
        };
  
      case CONST.UNLINK_DISCORD_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case CONST.GET_DISCORD_LOGIN_REDIRECT_REQUEST:
        return {
          ...state,
          error: "",
          loading: true,
        };
      case CONST.GET_DISCORD_LOGIN_REDIRECT_SUCCESS:
        return {
          ...state,
          error: "",
          loading: false,
        };
  
      case CONST.GET_DISCORD_LOGIN_REDIRECT_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };  
        case CONST.POST_DISCORD_LOGIN_REQUEST:
          return {
            ...state,
            error: "",
            loading: true,
          };
        case CONST.POST_DISCORD_LOGIN_SUCCESS:
          return {
            ...state,
            error: "",
            loading: false,
          };
    
        case CONST.POST_DISCORD_LOGIN_FAIL:
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

export default discordData;
