import { isEqual } from "lodash";

const clozeImageDragDropEvaluation = ({ userResponse, validation }) => {
  const { valid_response, alt_responses } = validation;
  const altResponses = alt_responses.map(res => res.value);
  altResponses.push(valid_response.value);
  const evaluation = userResponse.map((userResp, index) => {
    for (let i = 0; i < altResponses.length; i++) {
      if (isEqual(userResp, altResponses[i][index])) {
        return true;
      }
    }
    return false;
  });
  return evaluation;
};

export default clozeImageDragDropEvaluation;
