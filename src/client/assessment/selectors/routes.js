import { createSelector } from "reselect";

export const locationSelector = state => state.router.location;

export const testIdSelector = createSelector(
  locationSelector,
  location => {
    const testId = location.pathname.split("/").reverse()[0];
    return testId;
  }
);
