import { takeEvery, call, put, all } from "redux-saga/effects";
import { classBoardApi } from "@edulastic/api";
import { message } from "antd";
import { createSelector } from "reselect";
import { values as _values } from "lodash";

import { setShowScoreAction } from "../src/actions/classBoard";

import {
  RECEIVE_GRADEBOOK_REQUEST,
  RECEIVE_GRADEBOOK_SUCCESS,
  RECEIVE_GRADEBOOK_ERROR,
  RECEIVE_TESTACTIVITY_REQUEST,
  RECEIVE_TESTACTIVITY_SUCCESS,
  RECEIVE_TESTACTIVITY_ERROR,
  UPDATE_RELEASE_SCORE
} from "../src/constants/actions";

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
    // test, testItemsData, testActivities, studentNames, testQuestionActivities
    const { additionalData, ...gradebookData } = yield call(classBoardApi.testActivity, payload);
    yield put({
      type: RECEIVE_TESTACTIVITY_SUCCESS,
      payload: { gradebookData, additionalData }
    });

    const releaseScore = additionalData.showScore;
    yield put(setShowScoreAction(releaseScore));
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_TESTACTIVITY_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* releaseScoreSaga({ payload }) {
  try {
    const releaseScore = payload.isReleaseScore;
    yield call(classBoardApi.releaseScore, payload);
    yield put(setShowScoreAction(releaseScore));
  } catch (err) {
    const errorMessage = "Update release score is failing";
    yield call(message.error, errorMessage);
  }
}

export function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_GRADEBOOK_REQUEST, receiveGradeBookSaga),
    yield takeEvery(RECEIVE_TESTACTIVITY_REQUEST, receiveTestActivitySaga),
    yield takeEvery(UPDATE_RELEASE_SCORE, releaseScoreSaga)
  ]);
}

export const stateGradeBookSelector = state => state.author_classboard_gradebook;
export const stateTestActivitySelector = state => state.author_classboard_testActivity;

export const getGradeBookSelector = createSelector(
  stateTestActivitySelector,
  state => {
    const { entities } = state;
    const total = entities.length;
    const submittedEntities = entities.filter(x => x.status === "submitted");
    const submittedNumber = submittedEntities.length;
    // TODO: handle absent
    const absentNumber = 0;
    const submittedScores = submittedEntities
      .map(({ score, maxScore }) => score / maxScore)
      .reduce((prev, cur) => prev + cur, 0);
    const submittedScoresAverage = submittedNumber > 0 ? submittedScores / submittedNumber : 0;
    const startedEntities = entities.filter(x => x.status !== "notStarted");
    const questionMap = {};
    for (const entity of startedEntities) {
      const { questionActivities } = entity;
      for (const { _id, notStarted, skipped, correct, timeSpent, partiallyCorrect } of questionActivities) {
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
          continue;
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

export const getAssignmentClassIdSelector = createSelector(
  stateTestActivitySelector,
  ({ classId, assignmentId }) => ({ classId, assignmentId })
);

export const stateClassResponseSelector = state => state.classResponse;
export const stateStudentResponseSelector = state => state.studentResponse;
export const stateFeedbackResponseSelector = state => state.feedbackResponse;
export const stateStudentAnswerSelector = state => state.studentQuestionResponse;
export const stateQuestionAnswersSelector = state => state.classQuestionResponse;

export const getClassResponseSelector = createSelector(
  stateClassResponseSelector,
  state => state.data
);

export const showScoreSelector = createSelector(
  stateClassResponseSelector,
  state => state.showScore
);

export const getStudentResponseSelector = createSelector(
  stateStudentResponseSelector,
  state => state.data
);

export const getFeedbackResponseSelector = createSelector(
  stateFeedbackResponseSelector,
  state => state.data
);

export const getStudentQuestionSelector = createSelector(
  stateStudentAnswerSelector,
  state => state.data
);

export const getClassQuestionSelector = createSelector(
  stateQuestionAnswersSelector,
  state => state.data
);
