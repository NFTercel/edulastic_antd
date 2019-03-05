import { createSelector } from "reselect";

export const stateSelector = state => state.dictionaries;
export const curriculumsSelector = createSelector(
  stateSelector,
  state => state.curriculums
);
export const getCurriculumsListSelector = createSelector(
  curriculumsSelector,
  state => state.curriculums
);

export const standardsSelector = createSelector(
  stateSelector,
  state => state.standards
);
export const getStandardsListSelector = createSelector(
  standardsSelector,
  state => state.standards
);
