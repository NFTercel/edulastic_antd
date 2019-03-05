import { createSelector } from "reselect";

// constants

export const PREVIEW_UPDATE_LIST = "[itemAdd] PREVIEW_UPDATE_LIST";
export const CHANGE_PREVIEW_TAB = "[itemAdd] CHANGE_PREVIEW_TAB";

// actions

export const updatePreviewListAction = list => ({
  type: PREVIEW_UPDATE_LIST,
  payload: { list }
});

export const changePreviewTabAction = previewTab => ({
  type: CHANGE_PREVIEW_TAB,
  payload: { previewTab }
});

// reducer

const initialState = {
  list: [], // array of indexes,
  previewTab: "clear"
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PREVIEW_UPDATE_LIST:
      return { ...state, list: payload.list };
    case CHANGE_PREVIEW_TAB:
      return { ...state, previewTab: payload.previewTab };

    default:
      return state;
  }
};

// selectors

export const stateSelector = state => state.itemAdd;
export const getPreviewIndexesListSelector = createSelector(
  stateSelector,
  state => state.list
);
export const getPreivewTabSelector = createSelector(
  stateSelector,
  state => state.previewTab
);
