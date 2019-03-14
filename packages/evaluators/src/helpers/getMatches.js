import { isEqual, includes, difference } from "lodash";
import { evaluatorTypes } from "@edulastic/constants";

const getMatches = (response, answer, compareFunction) =>
  response.filter((resp, index) => {
    switch (compareFunction) {
      case evaluatorTypes.INNER_DIFFERENCE:
        return difference(answer[index], resp).length === 0 && difference(resp, answer[index]).length === 0;

      case evaluatorTypes.IS_EQUAL:
      case evaluatorTypes.MCQ_TYPE:
        return isEqual(answer[index], resp);

      default:
        return includes(answer, resp);
    }
  }).length;

export default getMatches;
