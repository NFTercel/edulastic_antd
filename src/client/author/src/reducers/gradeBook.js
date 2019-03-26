import { RECEIVE_GRADEBOOK_REQUEST, RECEIVE_GRADEBOOK_SUCCESS, RECEIVE_GRADEBOOK_ERROR } from "../constants/actions";
import { createAction } from "redux-starter-kit";
import { omit } from "lodash";

export const GRADEBOOK_SELECT_STUDENT = "[gradebook] select student";
export const GRADEBOOK_UNSELECT_STUDENT = "[gradebook] unselect student";
export const GRADEBOOK_UN_SELECTALL = "[gradebook] un-select all";
export const GRADEBOOK_SET_SELECTED = "[gradebook] set selected";

export const gradebookSelectStudentAction = createAction(GRADEBOOK_SELECT_STUDENT);
export const gradebookUnSelectStudentAction = createAction(GRADEBOOK_UNSELECT_STUDENT);
export const gradebookUnSelectAllAction = createAction(GRADEBOOK_UN_SELECTALL);
export const gradebookSetSelectedAction = createAction(GRADEBOOK_SET_SELECTED);

const initialState = {
  entities: {},
  error: null,
  loading: false,
  selectedStudents: {}
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
    case GRADEBOOK_SELECT_STUDENT:
      if (!Array.isArray(payload)) {
        return { ...state, selectedStudents: { ...state.selectedStudents, [payload]: true } };
      } else {
        const students = payload.reduce((prev, cur) => ({ ...prev, [cur]: true }), {});
        return { ...state, selectedStudents: { ...state.selectedStudents, ...students } };
      }
    case GRADEBOOK_UNSELECT_STUDENT:
      return { ...state, selectedStudents: omit(state.selectedStudents, [payload]) };
    case GRADEBOOK_UN_SELECTALL:
      return { ...state, selectedStudents: {} };
    case GRADEBOOK_SET_SELECTED:
      return { ...state, selectedStudents: payload.reduce((prev, cur) => ({ ...prev, [cur]: true }), {}) };
    default:
      return state;
  }
};

export default reducer;
