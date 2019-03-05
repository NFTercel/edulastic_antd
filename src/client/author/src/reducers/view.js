import { CHANGE_VIEW, CHANGE_PREVIEW } from "../constants/actions";

const initialState = {
  view: "edit",
  preview: "clear",
  showAnswers: false
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_VIEW:
      return { ...state, view: payload.view };
    case CHANGE_PREVIEW:
      return {
        ...state,
        preview: payload.view
      };
    default:
      return state;
  }
}
