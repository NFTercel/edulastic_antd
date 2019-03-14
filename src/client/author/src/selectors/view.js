import { createSelector } from "reselect";

const moduleName = "view";
export const stateSelector = state => state[moduleName];

export const getViewSelector = createSelector(
  stateSelector,
  state => state.view
);

export const getPreviewSelector = createSelector(
  stateSelector,
  state => state.preview
);
