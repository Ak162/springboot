import * as CONST from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  collection: {}
};

const collection = (state = initialState, action) => {
  switch (action.type) {
    case CONST.GET_COLLECTION:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case CONST.GET_COLLECTION_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        collection: action.payload.data,
      };

    case CONST.GET_COLLECTION_FAIL:
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

export default collection;
