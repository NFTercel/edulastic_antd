import { createSelector } from "reselect";

export const stateClassResponseSelector = state => state.author_classresponse;

export const getClassResponseSelector = createSelector(
  stateClassResponseSelector,
  state => state.entities
);
