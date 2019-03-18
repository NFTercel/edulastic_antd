import {
  RECEIVE_STUDENT_QUESTION_REQUEST,
  RECEIVE_STUDENT_QUESTION_SUCCESS,
  RECEIVE_STUDENT_QUESTION_ERROR
} from "../constants/actions";

const initialState = {
  data: {},
  error: null,
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_STUDENT_QUESTION_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_STUDENT_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case RECEIVE_STUDENT_QUESTION_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
