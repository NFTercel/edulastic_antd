import { SAVE_SCRATCH_PAD, LOAD_SCRATCH_PAD } from "../constants/actions";

export const saveScratchPadAction = payload => ({
  type: SAVE_SCRATCH_PAD,
  payload
});

export const loadScratchPadAction = payload => ({
  type: LOAD_SCRATCH_PAD
});
