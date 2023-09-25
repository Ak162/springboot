import * as CONST from "./actionTypes";

export const getCollection = (data, callback) => {
  return {
    type: CONST.GET_COLLECTION,
    payload: { data, callback },
  };
};

export const getCollectionFail = (payload) => {
  return {
    type: CONST.GET_COLLECTION_FAIL,
    payload: payload,
  };
};

export const getCollectionuccess = (user) => {
  return {
    type: CONST.GET_COLLECTION_SUCCESS,
    payload: user,
  };
};
