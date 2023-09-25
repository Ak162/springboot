import * as TYPES from "./actionTypes";

// get Teams
export const getTeams = (data, callback) => ({
  type: TYPES.GET_TEAMS,
  payload: { data, callback },
});

export const getTeamsFail = (error) => ({
  type: TYPES.GET_TEAMS_FAIL,
  payload: error,
});

export const getTeamsSuccess = (data) => ({
  type: TYPES.GET_TEAMS_SUCCESS,
  payload: data,
});

// get Faq's
export const getFaqs = (data, callback) => ({
  type: TYPES.GET_FAQS,
  payload: { data, callback },
});

export const getFaqsFail = (error) => ({
  type: TYPES.GET_FAQS_FAIL,
  payload: error,
});

export const getFaqsSuccess = (data) => ({
  type: TYPES.GET_FAQS_SUCCESS,
  payload: data,
});

// Get Raodmap
export const getRoadmaps = (data, callback) => ({
  type: TYPES.GET_ROADMAPS,
  payload: { data, callback },
});

export const getRoadmapsFail = (error) => ({
  type: TYPES.GET_ROADMAPS_FAIL,
  payload: error,
});

export const getRoadmapsSuccess = (data) => ({
  type: TYPES.GET_ROADMAPS_SUCCESS,
  payload: data,
});
