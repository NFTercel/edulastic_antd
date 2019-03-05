import { CHANGE_PREVIEW } from "../constants/actions";

// change test item view type
export const changePreview = view => ({
  type: CHANGE_PREVIEW,
  payload: {
    view
  }
});
