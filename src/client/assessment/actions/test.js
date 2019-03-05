import { LOAD_TEST, FINISH_TEST, LOAD_PREVIOUS_RESPONSES } from "../constants/actions";

export const loadTestAction = payload => ({
  type: LOAD_TEST,
  payload
});

export const finishTestAcitivityAction = () => ({
  type: FINISH_TEST
});

export const loadPreviousReponseAction = () => ({
  type: LOAD_PREVIOUS_RESPONSES
});
