import {
  GET_WALLETS,
  GET_WALLETS_SUCCESS,
  GET_WALLETS_FAIL,
  ADD_WALLET,
  ADD_WALLET_SUCCESS,
  ADD_WALLET_FAIL,
  EDIT_WALLET,
  EDIT_WALLET_FAIL,
  EDIT_WALLET_SUCCESS,
  DELETE_WALLET,
  DELETE_WALLET_FAIL,
  DELETE_WALLET_SUCCESS
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  wallets: [],
};

const wallets = (state = initialState, action) => {
  console.log('////',action?.payload?.data,'//////state',state)
  switch (action.type) {
    case GET_WALLETS:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case GET_WALLETS_SUCCESS:
      return {
        ...state,
        error: "",
        wallets: action.payload.data,
        loading: false,
      };

    case GET_WALLETS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case ADD_WALLET:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case ADD_WALLET_SUCCESS:
      return {
        ...state,
        error: "",
        wallets: [...state.wallets, ...([action.payload?.data] || [])],
        loading: false,
      };

    case ADD_WALLET_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case EDIT_WALLET:
        return {
          ...state,
          error: "",
          loading: true,
        };
      case EDIT_WALLET_SUCCESS:
        return {
          ...state,
          error: "",
          loading: false,
        };
  
      case EDIT_WALLET_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
        case DELETE_WALLET:
          return {
            ...state,
            error: "",
            wallets: [...state?.wallets?.filter(item => item.id !== action?.payload?._id)],
            loading: true,
          };
        case DELETE_WALLET_SUCCESS:
          return {
            ...state,
            error: "",
            loading: false,
          };
    
        case DELETE_WALLET_FAIL:
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

export default wallets;
