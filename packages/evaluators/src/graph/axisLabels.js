import { ScoringType } from "../const/scoring";

const checkAnswer = (answer, userResponse) => {
  const result = [];

  const trueAnswerValue = answer.value;

  userResponse.forEach(testLabel => {
    const resultForLabel = {
      label: testLabel,
      result: false
    };

    if (
      trueAnswerValue.findIndex(item => item.point === testLabel.point && item.position === testLabel.position) > -1
    ) {
      resultForLabel.result = true;
    }

    result.push(resultForLabel);
  });

  return result;
};

const exactMatchEvaluator = (userResponse, answers) => {
  let score = 0;
  let maxScore = 1;

  const evaluation = {};

  answers.forEach((answer, index) => {
    const answerResult = {
      result: false,
      details: checkAnswer(answer, userResponse),
      score: 0
    };

    const trueLabelsCount = answerResult.details.filter(item => item.result).length;
    const allIsTrue = trueLabelsCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;

    if (answerResult.result) {
      answerResult.score = answer.score;
      score = Math.max(answerResult.score, score);
    }

    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = answerResult;
  });

  return {
    score,
    maxScore,
    evaluation
  };
};

const partialMatchPerResponseEvaluator = (userResponse, answers) => {
  let score = 0;
  let maxScore = 1;

  const evaluation = {};

  answers.forEach((answer, index) => {
    const answerResult = {
      result: false,
      details: checkAnswer(answer, userResponse),
      score: 0
    };

    const trueLabelsCount = answerResult.details.filter(item => item.result).length;
    const allIsTrue = trueLabelsCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;

    answerResult.score = answer.score * trueLabelsCount;

    score = Math.max(answerResult.score, score);
    maxScore = Math.max(answer.score * answer.value.length, maxScore);
    evaluation[index] = answerResult;
  });

  return {
    score,
    maxScore,
    evaluation
  };
};

const partialMatchEvaluator = (userResponse, answers, roundingIsNone) => {
  let score = 0;
  let maxScore = 1;

  const evaluation = {};

  answers.forEach((answer, index) => {
    const answerResult = {
      result: false,
      details: checkAnswer(answer, userResponse),
      score: 0
    };

    const trueLabelsCount = answerResult.details.filter(item => item.result).length;
    const allIsTrue = trueLabelsCount === answerResult.details.length;
    answerResult.result = answer.value.length === userResponse.length && allIsTrue;

    const pointsPerOneLabel = answer.value.length ? answer.score / answer.value.length : 0;
    answerResult.score = roundingIsNone
      ? pointsPerOneLabel * trueLabelsCount
      : Math.floor(pointsPerOneLabel * trueLabelsCount);

    score = Math.max(answerResult.score, score);
    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = answerResult;
  });

  return {
    score,
    maxScore,
    evaluation
  };
};

const evaluator = ({ userResponse, validation }) => {
  const { valid_response, alt_responses, scoring_type, rounding } = validation;

  let answers = [valid_response];
  if (alt_responses) {
    answers = answers.concat([...alt_responses]);
  }

  const roundingIsNone = rounding && rounding === "none";

  switch (scoring_type) {
    case ScoringType.PARTIAL_MATCH:
      return partialMatchEvaluator(userResponse, answers, roundingIsNone);
    case ScoringType.PARTIAL_MATCH_V2:
      return partialMatchPerResponseEvaluator(userResponse, answers);
    case ScoringType.EXACT_MATCH:
    default:
      return exactMatchEvaluator(userResponse, answers);
  }
};

export default evaluator;
