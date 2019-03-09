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

export const getUserNameSelector = createSelector(
  stateSelector,
  state => (state.user && state.user.firstName) || "Anonymous"
);

export const getCurrentGroup = createSelector(
  stateSelector,
  state => state.user && state.user.orgData && state.user.orgData.defaultClass
);
