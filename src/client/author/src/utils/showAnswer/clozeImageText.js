const createEvaluation = ({ hasGroupResponses, validation }, answer) => {
  const answers = answer || [];
  const correctAnswers = validation.valid_response.value;
  const evaluation = answers.map((option, index) => {
    if (hasGroupResponses) {
      return correctAnswers[index].group === option.group && correctAnswers[index].data === option.data;
    }
    return correctAnswers[index] === option;
  });
  return evaluation;
};

export default createEvaluation;
