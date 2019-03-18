import { keyBy as _keyBy, shuffle as _shuffle } from "lodash";

const shuffleOptions = (questions = [], qActivitiesById = {}) => {
  const optionsOrder = {};

  const modifiedQuestions = questions.map(question => {
    if (question.type === "multipleChoice") {
      let { shuffledOptions } = qActivitiesById[question.id] || {};
      if (!shuffledOptions) {
        shuffledOptions = _shuffle(question.options.map(item => item.value));
      }
      optionsOrder[question.id] = shuffledOptions;
      const optionByValue = _keyBy(question.options, "value");
      question.options = shuffledOptions.map(id => optionByValue[id]);
    }

    return question;
  });

  return [modifiedQuestions, optionsOrder];
};

export const ShuffleChoices = (testItems, questionActivities) => {
  const qActivitiesById = _keyBy(questionActivities, "qid");
  let shuffles = {};
  testItems.forEach(item => {
    let optionsOrder;
    [item.data.questions, optionsOrder] = shuffleOptions(item.data.questions, qActivitiesById);
    shuffles = {
      ...shuffles,
      ...optionsOrder
    };
  });

  return [testItems, shuffles];
};
