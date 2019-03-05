import { createAction, createReducer } from "redux-starter-kit";
import { createSelector } from "reselect";
import { keyBy } from "lodash";

// types
export const SET_TEST_ITEM = "[studentTestItem] set test item";
export const SET_CURRENT_ITEM = "[studentTestItem] set current item";

// actions
export const setTestItemsAction = createAction(SET_TEST_ITEM);
export const setCurrentItemAction = createAction(SET_CURRENT_ITEM);

// initial state
const initialState = {
  items: [],
  current: 0
};

// set test items
const setTestItems = (state, { payload }) => {
  let prev = state.items;
  state.items = payload;
};

// set current item
const setCurrentItem = (state, { payload }) => {
  state.current = payload;
};

// reducer
export default createReducer(initialState, {
  [SET_TEST_ITEM]: setTestItems,
  [SET_CURRENT_ITEM]: setCurrentItem
});

// get testITem questions
export const getTestItemQuestions = item => {
  if (item && item.data && item.data.questions) {
    return item.data.questions;
  } else {
    return [];
  }
};
// selectors
const module = "studentTestItems";
export const getCurrentItemSelector = state => state[module].current;
export const getItemCountSelector = state => state[module].items.length;
export const getItemsSelector = state => state[module].items;
export const getTestFeedbackSelector = state => state["testFeedback"];

export const getItemSelector = createSelector(
  getItemsSelector,
  getCurrentItemSelector,
  (items, current) => items[current]
);

export const getQuestionWithFeedbackSelector = createSelector(
  getItemSelector,
  getTestFeedbackSelector,
  (item, testFeedback) => {
    const feedbackIndex = keyBy(testFeedback, "qid");
    const questions = getTestItemQuestions(item);
    const questionsWithFeedback = questions.map(data => ({
      ...data,
      feedback: feedbackIndex[data.id] ? feedbackIndex[data.id] : null
    }));
    return questionsWithFeedback;
  }
);
