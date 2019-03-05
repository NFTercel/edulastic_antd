import {
  RECEIVE_QUESTION_REQUEST,
  RECEIVE_QUESTION_SUCCESS,
  RECEIVE_QUESTION_ERROR,
  SAVE_QUESTION_REQUEST,
  SAVE_QUESTION_SUCCESS,
  SAVE_QUESTION_ERROR,
  SET_QUESTION_DATA,
  SET_QUESTION,
  SET_QUESTION_ALIGNMENT_ADD_ROW,
  SET_QUESTION_ALIGNMENT_REMOVE_ROW
} from "../constants/actions";

const initialState = {
  entity: null,
  loading: false,
  saving: false,
  error: null,
  saveError: null
};

const question = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        entity: payload.entity
      };
    case RECEIVE_QUESTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload.error
      };

    case SAVE_QUESTION_REQUEST:
      return {
        ...state,
        saving: true
      };
    case SAVE_QUESTION_SUCCESS:
      return {
        ...state,
        saving: false
      };
    case SAVE_QUESTION_ERROR:
      return {
        ...state,
        saving: false,
        saveError: payload.error
      };

    case SET_QUESTION_DATA:
      return {
        ...state,
        entity: { ...state.entity, data: payload.data }
      };
    case SET_QUESTION_ALIGNMENT_ADD_ROW: {
      const { alignmentRow } = payload;
      const currentAlignment = state.entity.data && state.entity.data.alignment;
      const newAlignment = currentAlignment ? [...currentAlignment] : [];
      newAlignment.push(alignmentRow);
      return {
        ...state,
        entity: {
          ...state.entity,
          data: {
            ...state.entity.data,
            alignment: newAlignment
          }
        }
      };
    }
    case SET_QUESTION_ALIGNMENT_REMOVE_ROW: {
      const { index } = payload;
      const newAlignment = [...state.entity.data.alignment];
      newAlignment.splice(index, 1);
      return {
        ...state,
        entity: {
          ...state.entity,
          data: {
            ...state.entity.data,
            alignment: newAlignment
          }
        }
      };
    }
    case SET_QUESTION:
      return {
        ...state,
        entity: {
          data: payload.data
        }
      };

    default:
      return state;
  }
};

export default question;
