import { createSelector } from "reselect";
import { get, groupBy, forEach } from "lodash";
import { getTestSelector } from "../../ducks";

// selector

export const getScoringSelector = createSelector(
  getTestSelector,
  state => state.scoring
);

export const getSummarySelector = createSelector(
  getTestSelector,
  getScoringSelector,
  (state, scoring) => {
    const reduceTestItems = (acc, testItem) => {
      const questions = get(testItem, "data.questions", []);
      const res = questions.map(q => {
        const item = scoring.testItems.find(({ id }) => testItem._id === id);
        const score = item && item.points ? item.points : 0;

        return {
          id: q._id,
          score,
          standards: get(q, "standardsMap.domains", []).reduce((st, domain) => [...st, ...domain.standards], [])
        };
      });

      acc.push(res);
      return acc;
    };

    const toQuestions = (acc, question) => [...acc, ...question];

    const toResult = (acc, question) => [
      ...acc,
      ...question.standards.map(standard => ({
        score: question.score || 0,
        id: question._id,
        standard
      }))
    ];

    const testItems = state.testItems.reduce(reduceTestItems, []);
    const questions = testItems.reduce(toQuestions, []);

    const groupedResult = groupBy(questions.reduce(toResult, []), item => item.standard.name);

    const result = [];

    forEach(groupedResult, (value, key) => {
      result.push({
        standard: key,
        questionsCount: value.length,
        score: value.reduce((acc, item) => acc + +item.score, 0)
      });
    });

    return result;
  }
);
