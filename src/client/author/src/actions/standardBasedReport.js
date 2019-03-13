import { GET_STANDARD_BASED_REPORTS } from "../constants/actions";

export const getReceivedBasedReportsAction = (assignmentId, classId) => ({
  type: GET_STANDARD_BASED_REPORTS,
  payload: { assignmentId, classId }
});
