import {
  RECEIVE_FEEDBACK_RESPONSE_REQUEST,
  RECEIVE_FEEDBACK_RESPONSE_SUCCESS,
  RECEIVE_FEEDBACK_RESPONSE_ERROR
} from "../constants/actions";

const initialState = {
  data: {},
  error: null,
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_FEEDBACK_RESPONSE_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_FEEDBACK_RESPONSE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case RECEIVE_FEEDBACK_RESPONSE_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
