import { createSelector } from "reselect";
import { cloneDeep } from "lodash";
import { getAnswersListSelector } from "./answers";

const stateSelector = state => state.test;

export const currentItemIndexSelector = createSelector(
  stateSelector,
  state => state.currentItem
);

export const itemsSelector = createSelector(
  stateSelector,
  state => state.items
);

export const currentItemSelector = createSelector(
  itemsSelector,
  currentItemIndexSelector,
  (items, index) => items[index]
);

export const currentQuestions = createSelector(
  currentItemSelector,
  item => {
    const rows = Array.isArray(item.rows) ? item.rows : [];
    return rows.reduce((acc, row) => {
      const widgets = Array.isArray(row.widgets) ? row.widgets : [];
      return [...acc, ...widgets];
    }, []);
  }
);

export const answersForCheck = createSelector(
  getAnswersListSelector,
  currentQuestions,
  answers => {
    const newAnswers = cloneDeep(answers);

    return newAnswers;
  }
);

export const itemQuestionsSelector = createSelector(
  currentItemSelector,
  item => {
    const questions = [];
    item.rows.forEach(row => {
      row.widgets.forEach(widget => {
        const qid = widget.reference;
        if (qid) questions.push(qid);
      });
    });
    return questions;
  }
);

export const testLoadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
