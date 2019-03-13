import { keyBy, groupBy, mapValues } from "lodash";
import { testActivityStatus } from "@edulastic/constants";
import DotProp from "dot-prop";

const getAllQids = (testItemIds, testItemsDataKeyed) => {
  let qids = [];
  for (let testItemId of testItemIds) {
    let questions = (testItemsDataKeyed[testItemId].data && testItemsDataKeyed[testItemId].data.questions) || [];
    qids = [...qids, ...questions.map(x => x.id)];
  }
  return qids;
};

/**
 * @returns {number}
 */
const getMaxScoreFromQuestion = question => {
  let possibleScores = [DotProp.get(question, "validation.valid_response.score", 0)];
  const alternateResponses = DotProp.get(question, "validation.alt_responses", false);
  if (alternateResponses) {
    possibleScores = possibleScores.concat(alternateResponses.map(r => r.score));
  }
  return Math.max(...possibleScores);
};

/**
 * @returns {number}
 */
const getMaxScoreFromItem = testItem => {
  let total = 0;
  if (!testItem) {
    return total;
  }
  if (!(testItem.data && testItem.data.questions)) {
    return total;
  }
  for (const question of testItem.data.questions) {
    total += getMaxScoreFromQuestion(question);
  }
  return total;
};

export const transformGradeBookResponse = ({
  test,
  testItemsData,
  students: studentNames,
  testActivities,
  testQuestionActivities
}) => {
  const testItemIds = test.testItems;
  const testItemsDataKeyed = keyBy(testItemsData, "_id");
  const qids = getAllQids(testItemIds, testItemsDataKeyed);

  const testMaxScore = testItemsData.reduce((prev, cur) => prev + getMaxScoreFromItem(cur), 0);

  const studentTestActivities = keyBy(testActivities, "userId");
  let testActivityQuestionActivities = groupBy(testQuestionActivities, "userId");
  //testActivityQuestionActivities = mapValues(testActivityQuestionActivities, v => keyBy(v, "qid"));

  //for students who hasn't even started the test
  const emptyQuestionActivities = qids.map(x => ({
    _id: x,
    notStarted: true
  }));

  return studentNames
    .map(({ _id: studentId, firstName: studentName }) => {
      if (!studentTestActivities[studentId]) {
        return {
          studentId,
          studentName,
          present: true,
          status: "notStarted",
          maxScore: testMaxScore,
          questionActivities: emptyQuestionActivities
        };
      }
      const testActivity = studentTestActivities[studentId];

      //TODO: for now always present
      const present = true;
      //TODO: no graded status now. using submitted as a substitute for graded
      const graded = testActivity.status == testActivityStatus.SUBMITTED;
      const submitted = testActivity.status == testActivityStatus.SUBMITTED;
      const testActivityId = testActivity._id;

      const questionActivitiesRaw = testActivityQuestionActivities[studentId];

      const score = (questionActivitiesRaw && questionActivitiesRaw.reduce((e1, e2) => (e2.score || 0) + e1, 0)) || 0;

      const questionActivitiesIndexed = (questionActivitiesRaw && keyBy(questionActivitiesRaw, x => x.qid)) || {};

      const questionActivities = qids.map(el => {
        const _id = el;

        if (!questionActivitiesIndexed[el]) {
          return { _id, notStarted: true };
        }
        const x = questionActivitiesIndexed[el];
        const skipped = x.skipped;
        const correct = x.correct;
        const partialCorrect = x.partiallyCorrect;
        const { score } = x;
        return {
          _id,
          skipped,
          correct,
          partialCorrect,
          score,
          maxScore: testMaxScore,
          //TODO: timespent value capture in the front-end
          timespent: null
        };
      });

      return {
        studentId,
        studentName,
        status: submitted ? "submitted" : "inProgress",
        present,
        graded,
        maxScore: testMaxScore,
        score,
        testActivityId,
        questionActivities
      };
    })
    .filter(x => x);
};
