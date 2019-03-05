import { createSelector } from "reselect";
import { getCurrentQuestionSelector } from "../../sharedDucks/questions";

export const stateSelector = state => state.question;
export const getQuestionSelector = createSelector(
  stateSelector,
  state => state.entity
);
export const getQuestionDataSelector = createSelector(
  getCurrentQuestionSelector,
  state => state
);
export const getQuestionAlignmentSelector = createSelector(
  getCurrentQuestionSelector,
  state => state.alignment
);

export const getValidationSelector = createSelector(
  getCurrentQuestionSelector,
  state => state.validation
);
