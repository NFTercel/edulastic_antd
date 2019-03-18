import {
  RECEIVE_CLASS_RESPONSE_REQUEST,
  RECEIVE_CLASS_RESPONSE_SUCCESS,
  RECEIVE_CLASS_RESPONSE_ERROR,
  SET_SHOW_SCORE
} from "../constants/actions";

const initialState = {
  data: {},
  error: null,
  loading: false,
  showScore: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_CLASS_RESPONSE_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_CLASS_RESPONSE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case RECEIVE_CLASS_RESPONSE_ERROR:
      return { ...state, loading: false, error: payload.error };
    case SET_SHOW_SCORE:
      return { ...state, showScore: payload };
    default:
      return state;
  }
};

export default reducer;
