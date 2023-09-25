import {
  ITEM_API_FAIL,
  POST_MINT_ACTIVITY,
  POST_MINT_ACTIVITY_FAIL,
  POST_MINT_ACTIVITY_SUCCESS,
  GET_ITEMS,
  GET_ITEMS_FAIL,
  GET_ITEMS_SUCCESS,
  NFTS_RRC_TO_MAINBUCKET_SUCCESS,
  NFTS_RRC_TO_MAINBUCKET_FAIL,
  NFTS_RRC_TO_MAINBUCKET_REQUEST,
  GET_USER_MINTED_NFTS_COUNT_REQUEST,
  GET_USER_MINTED_NFTS_COUNT_SUCCESS,
  GET_USER_MINTED_NFTS_COUNT_FAIL,
} from "./actionTypes";

export const apiFails = (error) => ({
  type: ITEM_API_FAIL,
  payload: error,
});

/* Post Mint Activity */
export const postMintActivity = (data, callback) => ({
  type: POST_MINT_ACTIVITY,
  payload: { data, callback },
});

export const postMintActivityFail = (error) => ({
  type: POST_MINT_ACTIVITY_FAIL,
  payload: error,
});

export const postMintActivitySuccess = (data) => ({
  type: POST_MINT_ACTIVITY_SUCCESS,
  payload: data,
});
/* Post Mint Activity END */


/* get item list */
export const getItems = (data, callback) => ({
  type: GET_ITEMS,
  payload: { data, callback },
});

export const getItemsFail = (error) => ({
  type: GET_ITEMS_FAIL,
  payload: error,
});

export const getItemsSuccess = (data) => ({
  type: GET_ITEMS_SUCCESS,
  payload: data,
});
/* get item list END */

//nft rrc to main bucket

export const postNftRrcToMainBucketRequest = (data, callback) => ({
  type: NFTS_RRC_TO_MAINBUCKET_REQUEST,
  payload: { data, callback },
});

export const postNftRrcToMainBucketSuccess = (data) => ({
  type: NFTS_RRC_TO_MAINBUCKET_SUCCESS,
  payload: data,
});

export const postNftRrcToMainBucketFail = (data) => ({
  type: NFTS_RRC_TO_MAINBUCKET_FAIL,
  payload: data,
});


//get user minted nfts count

export const getUserMintedNftsCountRequest = (data, callback) => ({
  type: GET_USER_MINTED_NFTS_COUNT_REQUEST,
  payload: { data, callback },
});

export const getUserMintedNftsCountSuccess = (data) => ({
  type: GET_USER_MINTED_NFTS_COUNT_SUCCESS,
  payload: data,
});

export const getUserMintedNftsCountFail = (data) => ({
  type: GET_USER_MINTED_NFTS_COUNT_FAIL,
  payload: data,
});
