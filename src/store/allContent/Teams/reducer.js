import * as TYPES from "./actionTypes";

const INIT_STATE = {
  loading: false,
  teams: [],
  faqs: [],
  roadmaps: [],
  error: "",
};

const Reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_TEAMS:
      return {
        ...state,
        loading: true,
      };

    case TYPES.GET_TEAMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TYPES.GET_TEAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: action?.payload,
      };

    // get faqs

    case TYPES.GET_FAQS:
      return {
        ...state,
        loading: true,
      };

    case TYPES.GET_FAQS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TYPES.GET_FAQS_SUCCESS:
      return {
        ...state,
        loading: false,
        faqs: action?.payload,
      };

    case TYPES.GET_ROADMAPS:
      return {
        ...state,
        loading: true,
      };

    case TYPES.GET_ROADMAPS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TYPES.GET_ROADMAPS_SUCCESS:
      return {
        ...state,
        loading: false,
        roadmaps: action?.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
