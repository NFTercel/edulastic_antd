import {
  RECEIVE_CLASS_RESPONSE_REQUEST,
  RECEIVE_STUDENT_RESPONSE_REQUEST,
  RECEIVE_FEEDBACK_RESPONSE_REQUEST,
  RECEIVE_GRADEBOOK_REQUEST,
  RECEIVE_TESTACTIVITY_REQUEST
} from "../constants/actions";

export const receiveClassResponseAction = data => ({
  type: RECEIVE_CLASS_RESPONSE_REQUEST,
  payload: data
});

export const receiveStudentResponseAction = data => ({
  type: RECEIVE_STUDENT_RESPONSE_REQUEST,
  payload: data
});

export const receiveFeedbackResponseAction = data => ({
  type: RECEIVE_FEEDBACK_RESPONSE_REQUEST,
  payload: data
});

export const receiveGradeBookdAction = (assignmentId, classId) => ({
  type: RECEIVE_GRADEBOOK_REQUEST,
  payload: { assignmentId, classId }
});

export const receiveTestActivitydAction = (assignmentId, classId) => ({
  type: RECEIVE_TESTACTIVITY_REQUEST,
  payload: { assignmentId, classId }
});
