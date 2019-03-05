const exactMatchEvaluator = ({ min_score_if_attempted, max_score }) => ({
  score: min_score_if_attempted,
  maxScore: max_score,
  evaluation: {}
});

const evaluator = ({ validation }) => exactMatchEvaluator(validation);

export default evaluator;
