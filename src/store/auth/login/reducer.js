import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  LOGIN_USER_WITH_EMAIL,
  LOGIN_USER_WITH_EMAIL_FAIL,
  LOGIN_USER_WITH_EMAIL_SUCCESS,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "./actionTypes";

const {data} = JSON.parse(localStorage.getItem("authUser") || "{}");
console.log('data',data)
const initialState = {
  error: "",
  loading: false,
  user:  data?.user,
  authToken:  data && data.Token?data.Token:null,
  currentWalletAddress: null,
  loadingLoginWithWallet : false,
  forgotPasswordEmail : null,
  forgotResetLoading : false
};

const login = (state = initialState, action) => {
  console.log('////////////typeinreducer',action.type,'//////',action.payload?.data)
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        error: "",
        loadingLoginWithWallet: true,
      };
        
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: "",
        user: action.payload.data?.user,
        authToken: action.payload.data?.Token,
        loadingLoginWithWallet: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingLoginWithWallet: false,
      };

    case SET_USER:
      return {
        ...state,
        error: "",
        user: action.payload.data,
        loading: false,
      };

    case LOGOUT_USER:
      return { ...state };
    case LOGOUT_USER_SUCCESS:
      return { ...state, user: {}, authToken: null };

    case LOGIN_USER_WITH_EMAIL:
      return {...state,
        error: "",
        loading: true,
      }
      case LOGIN_USER_WITH_EMAIL_SUCCESS:
        return {...state,
          error: "",
          loading: false,
          authToken : action.payload.data.Token,
          user:action.payload.data.user,  
        }  
        case LOGIN_USER_WITH_EMAIL_FAIL:
          return {...state,
            error: "",
            loading: false, 
          }    
          
        case USER_FORGOT_PASSWORD_REQUEST:
        return {...state,
           error: "",
           forgotResetLoading: true,
        }
        case USER_FORGOT_PASSWORD_SUCCESS:
        return {...state,
          error: "",
          forgotResetLoading: false,
          forgotPasswordEmail:action.payload.data.email,  
        }  
        case USER_FORGOT_PASSWORD_FAIL:
        return {
          ...state,
          error: "",
          forgotResetLoading: false, 
        }           

        case RESET_PASSWORD_REQUEST:
        return {
          ...state,
           error: "",
           forgotResetLoading: true,
        }
        case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          error: "",
          forgotResetLoading: false  
        }  
        case RESET_PASSWORD_FAIL:
        return {
          ...state,
          error: "",
          forgotResetLoading: false, 
        }  

    default:
      return { ...state };
  }
  return state;
};

export default login;
