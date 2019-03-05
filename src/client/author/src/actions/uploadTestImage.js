import { UPDATE_TEST_IMAGE } from "../constants/actions";

export const uploadTestImageAction = fileUrl => ({
  type: UPDATE_TEST_IMAGE,
  payload: { fileUrl }
});
