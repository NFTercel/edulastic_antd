const ClozeTextEvaluation = ({ userResponse, validation }) => {
  const { valid_response, alt_responses } = validation;
  const result = {};
  const altResponses = alt_responses.map(res => res.value);
  altResponses.push(valid_response.value);
  userResponse.forEach((resp, index) => {
    result[index] = altResponses.filter(item => item[index] === resp).length > 0;
  });
  return result;
};

export default ClozeTextEvaluation;
