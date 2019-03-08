import { createSelector } from "reselect";

export const stateGradeBookSelector = state => state.author_classboard_gradebook;
export const stateTestActivitySelector = state => state.author_classboard_testActivity;
export const stateClassResponseSelector = state => state.classResponse;
export const stateStudentResponseSelector = state => state.studentResponse;
export const stateFeedbackResponseSelector = state => state.feedbackResponse;

export const getGradeBookSelector = createSelector(
  stateGradeBookSelector,
  state => state.entities
);

export const getTestActivitySelector = createSelector(
  stateTestActivitySelector,
  state => state.entities
);

export const getClassResponseSelector = createSelector(
  stateClassResponseSelector,
  state => state.data
);

export const getStudentResponseSelector = createSelector(
  stateStudentResponseSelector,
  state => state.data
);

export const getFeedbackResponseSelector = createSelector(
  stateFeedbackResponseSelector,
  state => state.data
);
