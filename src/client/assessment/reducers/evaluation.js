import { ADD_ITEM_EVALUATION } from "../constants/actions";

const initialState = {};

const evaluation = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM_EVALUATION:
      return {
        ...payload
      };
    default:
      return state;
  }
};

export default evaluation;
