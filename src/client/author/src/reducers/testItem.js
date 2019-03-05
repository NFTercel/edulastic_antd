import { CREATE_TEST_ITEM_REQUEST, CREATE_TEST_ITEM_SUCCESS, CREATE_TEST_ITEM_ERROR } from "../constants/actions";

const initialState = {
  item: [],
  createError: null,
  creating: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_TEST_ITEM_REQUEST:
      return { ...state, creating: true };
    case CREATE_TEST_ITEM_SUCCESS:
      return {
        ...state,
        creating: false,
        item: payload.item
      };
    case CREATE_TEST_ITEM_ERROR:
      return { ...state, creating: false, createError: payload.error };
    default:
      return state;
  }
};
