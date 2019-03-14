import { evaluatorTypes } from "@edulastic/constants";
import mainEvaluator from "./mainEvaluator";

const evaluator = mainEvaluator(evaluatorTypes.MCQ_TYPE);

export default evaluator;
