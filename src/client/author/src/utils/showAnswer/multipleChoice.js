const createEvaluation = ({ options, validation }) => {
  const correctAnswers = validation.valid_response.value;
  const evaluation = options.map(option => correctAnswers.includes(option.value));
  return evaluation;
};

export default createEvaluation;
