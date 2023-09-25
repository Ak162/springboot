import { takeLatest, put, call } from "redux-saga/effects";

import * as TYPES from "./actionTypes";
import * as ACTION from "./actions";
import * as API from "helpers/backend_helper";

function* onGetTeams({ payload: { data, callback } }) {
  try {
    const response = yield call(API.getTeams, data);
    if (response.status === "failure") {
      return yield put(ACTION.getTeamsFail(response.message));
    }
    callback && callback(response);
    yield put(ACTION.getTeamsSuccess(response.data));
  } catch (error) {
    yield put(ACTION.getTeamsFail(error));
  }
}

function* onGetFaqs({ payload: { data, callback } }) {
  try {
    const response = yield call(API.getFaqs, data);
    if (response.status === "failure") {
      return yield put(ACTION.getFaqsFail(response.message));
    }
    callback && callback(response);
    yield put(ACTION.getFaqsSuccess(response.data));
  } catch (error) {
    yield put(ACTION.getFaqsFail(error));
  }
}

function* onGetRoadMap({ payload: { data, callback } }) {
  try {
    const response = yield call(API.getRoadmap, data);
    if (response.status === "failure") {
      return yield put(ACTION.getRoadmapsFail(response.message));
    }

    callback && callback(response);
    yield put(ACTION.getRoadmapsSuccess(response.data));
  } catch (error) {
    yield put(ACTION.getRoadmapsFail(error));
  }
}

function* Saga() {
  yield takeLatest(TYPES.GET_TEAMS, onGetTeams);
  yield takeLatest(TYPES.GET_FAQS, onGetFaqs);
  yield takeLatest(TYPES.GET_ROADMAPS, onGetRoadMap);
}
export default Saga;
