import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { questionsApi, testItemsApi } from "@edulastic/api";
import { message } from "antd";
import { history } from "../../../configureStore";
import {
  RECEIVE_QUESTION_REQUEST,
  RECEIVE_QUESTION_SUCCESS,
  RECEIVE_QUESTION_ERROR,
  SAVE_QUESTION_REQUEST,
  SAVE_QUESTION_ERROR,
  LOAD_QUESTION,
  UPDATE_ITEM_DETAIL_SUCCESS
} from "../constants/actions";
import {
  getCurrentQuestionSelector,
  getQuestionsArraySelector,
  changeCurrentQuestionAction
} from "../../sharedDucks/questions";
import { getItemDetailSelector } from "../selectors/itemDetail";

function* receiveQuestionSaga({ payload }) {
  try {
    const entity = yield call(questionsApi.getById, payload.id);

    yield put({
      type: RECEIVE_QUESTION_SUCCESS,
      payload: { entity }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = "Receive question is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_QUESTION_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export const getQuestionIds = item => {
  const { rows = [] } = item;
  let questionIds = [];
  rows.forEach(entry => {
    const qIds = (entry.widgets || []).map(w => w.reference);
    questionIds = [...questionIds, ...qIds];
  });

  return questionIds;
};

function* saveQuestionSaga() {
  try {
    const question = yield select(getCurrentQuestionSelector);
    const itemDetail = yield select(getItemDetailSelector);

    let currentQuestionIds = getQuestionIds(itemDetail);
    const { rowIndex, tabIndex } = history.location.state || {};
    const { id } = question;

    const entity = {
      ...question,
      firstMount: false
    };

    if (itemDetail && itemDetail.rows) {
      const isNew = currentQuestionIds.filter(item => item === id).length === 0;

      // if a new question add question
      if (isNew) {
        itemDetail.rows[rowIndex].widgets.push({
          widgetType: "question",
          type: entity.type,
          title: "Multiple choice",
          reference: id,
          tabIndex
        });
      }
    }

    currentQuestionIds = getQuestionIds(itemDetail);
    const allQuestions = yield select(getQuestionsArraySelector);
    const currentQuestions = allQuestions.filter(q => currentQuestionIds.includes(q.id));
    const data = {
      ...itemDetail,
      data: {
        questions: currentQuestions
      }
    };

    const item = yield call(testItemsApi.updateById, itemDetail._id, data);
    yield put({
      type: UPDATE_ITEM_DETAIL_SUCCESS,
      payload: { item }
    });

    yield call(message.success, "Update item by id is success", "Success");

    if (itemDetail) {
      yield call(history.push, {
        pathname: `/author/items/${itemDetail._id}/item-detail`,
        state: {
          backText: "Back to item list",
          backUrl: "/author/items",
          itemDetail: false
        }
      });
    }
  } catch (err) {
    console.error(err);
    const errorMessage = "Save question is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: SAVE_QUESTION_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* loadQuestionSaga({ payload }) {
  try {
    const { data, rowIndex } = payload;
    const { pathname } = history.location.pathname;

    yield put(changeCurrentQuestionAction(data.reference));
    yield call(history.push, {
      pathname: "/author/questions/edit",
      state: {
        backText: "question edit",
        backUrl: pathname,
        rowIndex
      }
    });
  } catch (e) {
    console.error(e);
    const errorMessage = "Loading Question is failing";
    yield call(message.error, errorMessage);
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_QUESTION_REQUEST, receiveQuestionSaga),
    yield takeEvery(SAVE_QUESTION_REQUEST, saveQuestionSaga),
    yield takeEvery(LOAD_QUESTION, loadQuestionSaga)
  ]);
}
