import { createSelector } from "reselect";

export const getAnswersListSelector = state => state.answers;

export const getAnswerByQuestionIdSelector = questionId =>
  createSelector(
    getAnswersListSelector,
    state => (questionId ? state[questionId] : undefined)
  );
