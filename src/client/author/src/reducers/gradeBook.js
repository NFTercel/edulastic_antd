import { RECEIVE_GRADEBOOK_REQUEST, RECEIVE_GRADEBOOK_SUCCESS, RECEIVE_GRADEBOOK_ERROR } from "../constants/actions";

const initialState = {
  entities: {},
  error: null,
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_GRADEBOOK_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_GRADEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: payload.entities
      };
    case RECEIVE_GRADEBOOK_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
