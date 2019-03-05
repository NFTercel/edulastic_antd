import {
  RECEIVE_DICT_CURRICULUMS_REQUEST,
  RECEIVE_DICT_STANDARDS_REQUEST,
  CLEAR_DICT_STANDARDS
} from "../constants/actions";

export const getDictCurriculumsAction = () => ({
  type: RECEIVE_DICT_CURRICULUMS_REQUEST
});

export const getDictStandardsForCurriculumAction = (curriculumId, grades, search) => ({
  type: RECEIVE_DICT_STANDARDS_REQUEST,
  payload: { curriculumId, grades, search }
});

export const clearDictStandardsAction = () => ({
  type: CLEAR_DICT_STANDARDS
});
