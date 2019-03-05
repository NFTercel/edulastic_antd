import { PREVIEW_UPDATE_LIST, CHANGE_PREVIEW_TAB } from "../constants/actions";

const initialState = {
  list: [], // array of indexes,
  previewTab: "clear"
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case PREVIEW_UPDATE_LIST:
      return { ...state, list: payload.list };
    case CHANGE_PREVIEW_TAB:
      return { ...state, previewTab: payload.previewTab };

    default:
      return state;
  }
}
