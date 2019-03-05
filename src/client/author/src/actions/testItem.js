import { CREATE_TEST_ITEM_REQUEST, UPDATE_TEST_ITEM_REQUEST, CHECK_ANSWER, SHOW_ANSWER } from "../constants/actions";

export const createTestItemAction = data => ({
  type: CREATE_TEST_ITEM_REQUEST,
  payload: data
});

export const updateTestItemByIdAction = (id, data) => ({
  type: UPDATE_TEST_ITEM_REQUEST,
  payload: { id, data }
});

export const checkAnswerAction = mode => ({
  type: CHECK_ANSWER,
  payload: mode
});

export const showAnswerAction = mode => ({
  type: SHOW_ANSWER,
  payload: mode
});
