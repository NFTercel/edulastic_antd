import { createSelector } from "reselect";
import { SET_MAX_ATTEMPT, SET_SAFE_BROWSE_PASSWORD } from "../../../src/constants/actions";
import { getTestEntitySelector } from "../../ducks";

// actions

export const setMaxAttemptsAction = data => ({
  type: SET_MAX_ATTEMPT,
  payload: { data }
});

export const setSafeBroswePassword = data => ({
  type: SET_SAFE_BROWSE_PASSWORD,
  payload: { data }
});
// selectors
export const getMaxAttemptSelector = createSelector(
  getTestEntitySelector,
  state => state.maxAttempts
);

export const getReleaseScoreSelector = createSelector(
  getTestEntitySelector,
  state => state.releaseScore
);

export const getTestTypeSelector = createSelector(
  getTestEntitySelector,
  state => state.testType
);

export const getActivityReview = createSelector(
  getTestEntitySelector,
  state => state.getActivityReview || true
);
