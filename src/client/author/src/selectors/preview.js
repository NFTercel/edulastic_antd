import { createSelector } from "reselect";

export const moduleName = "preview";

export const stateSelector = state => state[moduleName];
export const getPreviewIndexesListSelector = createSelector(
  stateSelector,
  state => state.list
);
export const getPreivewTabSelector = createSelector(
  stateSelector,
  state => state.previewTab
);
