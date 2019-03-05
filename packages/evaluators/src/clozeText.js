import { evaluatorTypes } from "@edulastic/constants";
import mainEvaluator from "./mainEvaluator";

const evaluator = mainEvaluator(evaluatorTypes.IS_EQUAL);

export default evaluator;
