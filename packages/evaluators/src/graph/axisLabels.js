
const checkAnswer = (answer, userResponse) => {
  const result = {
    commonResult: false,
    details: []
  };

  const trueAnswerValue = answer.value;

  userResponse.forEach((testItem) => {
    const resultForItem = {
      point: testItem.point,
      result: false
    };

    if (trueAnswerValue.findIndex(item => item.point === testItem.point &&
        item.position === testItem.position) > -1) {
      resultForItem.result = true;
    }

    result.details.push(resultForItem);
  });

  const allIsTrue = result.details.filter(item => item.result).length === result.details.length;
  result.commonResult = trueAnswerValue.length === userResponse.length && allIsTrue;

  return result;
};

const evaluator = ({ userResponse, validation }) => {
  const { valid_response, alt_responses } = validation;

  let score = 0;
  let maxScore = 0;

  const evaluation = {};

  let answers = [valid_response];
  if (alt_responses) {
    answers = answers.concat([...alt_responses]);
  }

  let result = {};

  answers.forEach((answer, index) => {
    result = checkAnswer(answer, userResponse);
    if (result.commonResult) {
      score = Math.max(answer.score, score);
    }
    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = result;
  });

  return {
    score,
    maxScore,
    evaluation
  };
};


export default evaluator;
