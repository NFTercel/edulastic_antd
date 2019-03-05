import { PREVIEW_UPDATE_LIST, CHANGE_PREVIEW_TAB } from "../constants/actions";

export const updatePreviewListAction = list => ({
  type: PREVIEW_UPDATE_LIST,
  payload: { list }
});

export const changePreviewTabAction = previewTab => ({
  type: CHANGE_PREVIEW_TAB,
  payload: { previewTab }
});
