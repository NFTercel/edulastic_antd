import { createReducer } from "redux-starter-kit";
import { LOAD_QUESTIONS } from "../constants/actions";

const initialState = {
  byId: {}
};

const loadQuestions = (state, { payload }) => {
  state.byId = payload;
};

export default createReducer(initialState, {
  [LOAD_QUESTIONS]: loadQuestions
});
