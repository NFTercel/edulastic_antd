/* eslint-disable */
import { LOAD_ASSESSMENT, START_ASSESSMENT } from "../constants/actions";

export const loadAssessment = (id, name) => ({
  type: LOAD_ASSESSMENT,
  payload: {
    id,
    name
  }
});

// start assessment
export const startAssessmentAction = () => ({
  type: START_ASSESSMENT
});
