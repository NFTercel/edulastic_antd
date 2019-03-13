import { GET_STANDARD_BASED_REPORTS_SUCCESS } from "../constants/actions";

const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STANDARD_BASED_REPORTS_SUCCESS:
      return { ...state, data: payload };
    default:
      return state;
  }
};

export default reducer;
