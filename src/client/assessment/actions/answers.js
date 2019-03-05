import { SET_ANSWER } from "../constants/actions";

export const setUserAnswerAction = (questionId, data) => ({
  type: SET_ANSWER,
  payload: {
    id: questionId,
    data
  }
});
