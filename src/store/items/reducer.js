import {
  ITEM_API_FAIL,
  POST_MINT_ACTIVITY,
  POST_MINT_ACTIVITY_FAIL,
  POST_MINT_ACTIVITY_SUCCESS,
  GET_ITEMS,
  GET_ITEMS_FAIL,
  GET_ITEMS_SUCCESS,
  NFTS_RRC_TO_MAINBUCKET_SUCCESS,
  NFTS_RRC_TO_MAINBUCKET_REQUEST,
  NFTS_RRC_TO_MAINBUCKET_FAIL,
  GET_USER_MINTED_NFTS_COUNT_REQUEST,
  GET_USER_MINTED_NFTS_COUNT_SUCCESS,
  GET_USER_MINTED_NFTS_COUNT_FAIL
} from "./actionTypes";

const INIT_STATE = {
  error: "",
  loading: false,
  items: [],
  total: 0,
  currentMintTokens : [],
  userWalletMintedNftsCount : 0,
  loadingUserMintedNftCount : false
};

const Items = (state = INIT_STATE, action) => {
  switch (action.type) {
    
    /* Post Mint Activity */
    case POST_MINT_ACTIVITY:
      return {
        ...state,
        loading: true,
      };

    case POST_MINT_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case POST_MINT_ACTIVITY_FAIL:
      return {
        ...state,
        loading: false,
      };
    /* Post Mint Activity END */

    /* get items */
    case GET_ITEMS:
      return {
        ...state,
        loading: true,
      };

    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.data || [],
        total: action.payload.totalCount || 0
      };

    case GET_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
      };
    /* get items END */

    case ITEM_API_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

      case NFTS_RRC_TO_MAINBUCKET_REQUEST:
      return {
        ...state,
        loading: false,
      };

    case NFTS_RRC_TO_MAINBUCKET_SUCCESS:
      return {
        ...state,
        loading: false,
        currentMintTokens: action.payload.data
      };

    case NFTS_RRC_TO_MAINBUCKET_FAIL:
      return {
        ...state,
        loading: false,
      };


      case GET_USER_MINTED_NFTS_COUNT_REQUEST:
      return {
        ...state,
        loadingUserMintedNftCount: false,
        userWalletMintedNftsCount: 0
      };

    case GET_USER_MINTED_NFTS_COUNT_SUCCESS:
      return {
        ...state,
        loadingUserMintedNftCount: false,
        userWalletMintedNftsCount: action.payload.totalCount
      };

    case GET_USER_MINTED_NFTS_COUNT_FAIL:
      return {
        ...state,
        loadingUserMintedNftCount: false,
        userWalletMintedNftsCount : 0
      };

    default:
      return state;
  }
};

export default Items;
