const mcqEvaluation = ({ userResponse, validation }) => {
  const { valid_response, alt_responses } = validation;
  const result = {};
  userResponse.forEach(resp => {
    const altResponses = alt_responses.map(res => res.value);
    result[resp] = !![...valid_response.value, ...altResponses].includes(resp);
  });

  return result;
};

export default mcqEvaluation;
