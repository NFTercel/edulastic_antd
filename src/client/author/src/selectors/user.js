import { createSelector } from "reselect";

export const stateSelector = state => state.user;

export const getUserIdSelector = createSelector(
  stateSelector,
  state => state._id
);

export const getUserSelector = createSelector(
  stateSelector,
  state => state
);
