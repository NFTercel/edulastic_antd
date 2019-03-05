const clozeDragDropEvaluation = ({ userResponse, validation, hasGroupResponses }) => {
  const { valid_response, alt_responses } = validation;
  const result = {};
  userResponse.forEach((resp, index) => {
    const altResponses = alt_responses.map(res => res.value);
    if (hasGroupResponses) {
      result[index] =
        (valid_response.value[index].group === resp.group && valid_response.value[index].data === resp.data) ||
        (altResponses[index] && altResponses[index].group === resp.group && altResponses[index].data === resp.data);
    } else {
      result[index] = valid_response.value[index] === resp || altResponses[index] === resp;
    }
  });
  return result;
};

export default clozeDragDropEvaluation;
