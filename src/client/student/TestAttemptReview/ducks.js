import { createSelector } from "reselect";

// selectors
export const answersSelector = state => state.answers;
export const itemsSelector = state => state.test.items || [];

export const attemptSummarySelector = createSelector(
  itemsSelector,
  answersSelector,
  (items, answers) => {
    const questions = {};
    // eslint-disable
    for (const item of items) {
      if (item && item.data && item.data.questions) {
        for (const { id: qId } of item.data.questions) {
          if (item.reviewLater) {
            questions[qId] = 2;
          } else {
            questions[qId] = answers[qId] ? 1 : 0;
          }
        }
      }
    }
    // eslint-enable
    return questions;
  }
);
