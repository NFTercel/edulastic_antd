import { evaluatorTypes } from "@edulastic/constants";
import mainEvaluator from "./mainEvaluator";

const evaluator = mainEvaluator(evaluatorTypes.INNER_DIFFERENCE);

export default evaluator;
