import { isEqual } from "lodash";

const createEvaluation = ({ validation }, answer = []) => {
  const correctAnswers = validation.valid_response.value;
  const evaluation = answer.map((optionArr, index) => {
    if (isEqual(optionArr, correctAnswers[index])) {
      return true;
    }
    return false;
  });
  return evaluation;
};

export default createEvaluation;
