const createEvaluation = ({ validation }, answer = []) => {
  const correct = validation.valid_response.value;
  const result = {};
  answer.forEach((resp, index) => {
    result[resp] = correct[index] === resp;
  });
  return result;
};

export default createEvaluation;
