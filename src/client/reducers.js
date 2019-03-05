import { combineReducers } from "redux";

import assessmentReducers from "./assessment/reducers";
import authorReducers from "./author/src/reducers";
import studentReducers from "./student/reducers";
import curriculumSequenceReducers from "./author/CurriculumSequence/ducks";
import { LOGOUT } from "./student/Login/ducks";

const rootReducer = combineReducers({
  ...assessmentReducers,
  ...authorReducers,
  ...studentReducers,
  curriculumSequence: curriculumSequenceReducers
});

export default (state, action) =>
  action.type === LOGOUT ? rootReducer(undefined, action) : rootReducer(state, action);
