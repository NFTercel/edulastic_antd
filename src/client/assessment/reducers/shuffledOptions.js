import { createReducer } from "redux-starter-kit";
import { SET_SHUFFLED_OPTIONS } from "../constants/actions";

const initialState = {};

const setAnswers = (state, { payload }) => {
  state = payload;
  return state;
};

export default createReducer(initialState, {
  [SET_SHUFFLED_OPTIONS]: setAnswers
});
