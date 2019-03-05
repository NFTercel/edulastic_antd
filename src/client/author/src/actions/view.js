import { CHANGE_VIEW, CHANGE_PREVIEW } from "../constants/actions";

export const changeViewAction = view => ({
  type: CHANGE_VIEW,
  payload: {
    view
  }
});

// change test item view type
export const changePreviewAction = view => ({
  type: CHANGE_PREVIEW,
  payload: {
    view
  }
});

export default changeViewAction;
