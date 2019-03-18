import { createSelector } from "reselect";

export const stateSelector = state => state.author_assignments;

export const getAssignmentsSelector = createSelector(
  stateSelector,
  state => state.entities
);

export const getAssignmentsLoadingSelector = createSelector(
  stateSelector,
  state => state.loading
);

export const getCurrentAssignmentSelector = createSelector(
  stateSelector,
  state => state.currentAssignment
);

export const getToggleReleaseGradeStateSelector = createSelector(
  stateSelector,
  state => state.toggleReleaseGradeSettings
);
