import { evaluatorTypes } from "@edulastic/constants";
import mainEvaluator from "./mainEvaluator";

const evaluator = mainEvaluator(evaluatorTypes.INCLUDES);

export default evaluator;
