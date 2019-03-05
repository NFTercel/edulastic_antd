import { takeEvery, call, put, all } from "redux-saga/effects";
import { classBoardApi } from "@edulastic/api";
import { message } from "antd";
import { createSelector } from "reselect";
import { values as _values } from "lodash";

import {
  RECEIVE_GRADEBOOK_REQUEST,
  RECEIVE_GRADEBOOK_SUCCESS,
  RECEIVE_GRADEBOOK_ERROR,
  RECEIVE_TESTACTIVITY_REQUEST,
  RECEIVE_TESTACTIVITY_SUCCESS,
  RECEIVE_TESTACTIVITY_ERROR
} from "../src/constants/actions";
import questions from "@edulastic/api/src/questions";

function* receiveGradeBookSaga({ payload }) {
  try {
    const entities = yield call(classBoardApi.gradebook, payload);

    yield put({
      type: RECEIVE_GRADEBOOK_SUCCESS,
      payload: { entities }
    });
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_GRADEBOOK_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* receiveTestActivitySaga({ payload }) {
  try {
    const { result, additionalData } = yield call(classBoardApi.testActivity, payload);
    yield put({
      type: RECEIVE_TESTACTIVITY_SUCCESS,
      payload: { entities: result, additionalData }
    });
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_TESTACTIVITY_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_GRADEBOOK_REQUEST, receiveGradeBookSaga),
    yield takeEvery(RECEIVE_TESTACTIVITY_REQUEST, receiveTestActivitySaga)
  ]);
}

export const stateGradeBookSelector = state => state.author_classboard_gradebook;
export const stateTestActivitySelector = state => state.author_classboard_testActivity;

export const getGradeBookSelector = createSelector(
  stateTestActivitySelector,
  state => {
    const entities = state.entities;
    const total = entities.length;
    const submittedEntities = entities.filter(x => x.status === "submitted");
    const submittedNumber = submittedEntities.length;
    //TODO: handle absent
    const absentNumber = 0;
    const submittedScores = submittedEntities
      .map(({ score, maxScore }) => score / maxScore)
      .reduce((prev, cur) => prev + cur, 0);
    const submittedScoresAverage = submittedNumber > 0 ? submittedScores / submittedNumber : 0;
    const startedEntities = entities.filter(x => x.status != "notStarted");
    let questionMap = {};
    for (let entity of startedEntities) {
      const questionActivities = entity.questionActivities;
      innerloop: for (let { _id, notStarted, skipped, correct, timeSpent, partiallyCorrect } of questionActivities) {
        if (!questionMap[_id]) {
          questionMap[_id] = {
            _id,
            attemptsNum: 0,
            avgTimeSpent: 0,
            correctNum: 0,
            skippedNum: 0,
            wrongNum: 0,
            partialNum: 0
          };
        }
        if (!notStarted) {
          questionMap[_id].attemptsNum += 1;
        } else {
          continue innerloop;
        }

        if (skipped) {
          questionMap[_id].skippedNum += 1;
        }

        if (correct) {
          questionMap[_id].correctNum += 1;
        } else {
          questionMap[_id].wrongNum += 1;
        }

        if (partiallyCorrect) {
          questionMap[_id].partialNum += 1;
        }

        if (timeSpent) {
          questionMap[_id].timeSpent = (questionMap[_id].timeSpent + timeSpent) / 2;
        }
      }
    }
    const itemsSummary = _values(questionMap);
    const result = {
      total,
      submittedNumber,
      absentNumber,
      avgScore: submittedScoresAverage,
      itemsSummary
    };
    console.log("classboard gradebook data", result);
    return result;
  }
);
export const getTestActivitySelector = createSelector(
  stateTestActivitySelector,
  state => state.entities
);

export const getAdditionalDataSelector = createSelector(
  stateTestActivitySelector,
  state => state.additionalData
);
