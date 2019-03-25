import { isEqual, includes, difference } from "lodash";
import { evaluatorTypes } from "@edulastic/constants";

const getMatches = (response, answer, compareFunction) =>
  response.filter((resp, index) => {
    switch (compareFunction) {
      case evaluatorTypes.INNER_DIFFERENCE:
        return difference(answer[index], resp).length === 0 && difference(resp, answer[index]).length === 0;

      case evaluatorTypes.IS_EQUAL:
      case evaluatorTypes.MCQ_TYPE:
        if (typeof answer[index] === "object" && answer[index].y) {
          return isEqual({ ...answer[index], y: +answer[index].y.toFixed(5) }, { ...resp, y: +resp.y.toFixed(5) });
        }
        return isEqual(answer[index], resp);

      default:
        return includes(answer, resp);
    }
  }).length;

export default getMatches;
