import { createSelector } from "reselect";
import { values } from "lodash";

const getQuestionsSelector = state => state.assessmentplayerQuestions;

export const getQuestionsListSelector = createSelector(
  getQuestionsSelector,
  state => values(state.byId)
);

export const getQuestionsByIdSelector = createSelector(
  getQuestionsSelector,
  state => state.byId
);
