const exactMatchEvaluator = ({ min_score_if_attempted, max_score }) => ({
  score: min_score_if_attempted || 0,
  maxScore: max_score || 1,
  evaluation: {}
});

const evaluator = ({ validation = {} }) => exactMatchEvaluator(validation);

export default evaluator;
