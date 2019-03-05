import { SET_ANSWER, LOAD_ANSWERS, REMOVE_ANSWERS } from "../constants/actions";

const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_ANSWER:
      return { ...state, [payload.id]: payload.data };
    case LOAD_ANSWERS:
      return {
        ...state,
        ...payload
      };
    case REMOVE_ANSWERS:
      return {};
    default:
      return state;
  }
}
