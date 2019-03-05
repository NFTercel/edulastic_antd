import { createSelector } from "reselect";
import { get, groupBy, forEach } from "lodash";

export const stateSelector = state => state.author_assignments;

export const getAssignmentsSelector = createSelector(
  stateSelector,
  state => state.entities
);

export const getAssignmentsLoadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
