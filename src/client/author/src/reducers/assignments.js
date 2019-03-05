import {
  RECEIVE_ASSIGNMENTS_REQUEST,
  RECEIVE_ASSIGNMENTS_SUCCESS,
  RECEIVE_ASSIGNMENTS_ERROR
} from "../constants/actions";

const initialState = {
  entities: [],
  error: null,
  page: 1,
  limit: 20,
  count: 0,
  loading: false,
  creating: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_ASSIGNMENTS_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_ASSIGNMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: payload.entities
      };
    case RECEIVE_ASSIGNMENTS_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
