const orderlistEvaluator = ({ userResponse, validation }) => {
  const answer = validation.valid_response.value;
  const result = {};
  userResponse.forEach((resp, index) => {
    result[resp] = answer[index] === resp;
  });

  return result;
};

export default orderlistEvaluator;
