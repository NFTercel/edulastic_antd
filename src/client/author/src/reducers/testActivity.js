import {
  RECEIVE_TESTACTIVITY_REQUEST,
  RECEIVE_TESTACTIVITY_SUCCESS,
  RECEIVE_TESTACTIVITY_ERROR
} from "../constants/actions";

import { createAction } from "redux-starter-kit";
import { produce } from "immer";

export const REALTIME_GRADEBOOK_TEST_ACTIVITY_ADD = "[gradebook] realtime test activity add";
export const REALTIME_GRADEBOOK_TEST_ACTIVITY_SUBMIT = "[gradebook] realtime test activity submit";
export const REALTIME_GRADEBOOK_TEST_ITEM_ADD = "[gradebook] realtime test item add";
export const realtimeGradebookActivityAddAction = createAction(REALTIME_GRADEBOOK_TEST_ACTIVITY_ADD);
export const realtimeGradebookActivitySubmitAction = createAction(REALTIME_GRADEBOOK_TEST_ACTIVITY_SUBMIT);
export const realtimeGradebookTestItemAddAction = createAction(REALTIME_GRADEBOOK_TEST_ITEM_ADD);

const initialState = {
  entities: [],
  error: null,
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  let nextState;
  switch (type) {
    case RECEIVE_TESTACTIVITY_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_TESTACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: payload.entities,
        additionalData: payload.additionalData
      };
    case REALTIME_GRADEBOOK_TEST_ACTIVITY_ADD:
      let entity = payload;

      nextState = produce(state, _st => {
        const index = _st.entities.findIndex(x => x.studentId === entity.studentId);
        console.log("taId student index", index);
        if (index != -1) {
          _st.entities[index].status = "inProgress";
          _st.entities[index].score = 0;
          _st.entities[index].testActivityId = entity.testActivityId;
          _st.entities[index].questionActivities = _st.entities[index].questionActivities.map(({ _id }) => ({
            _id,
            notStarted: true
          }));
        } else {
          console.warn(`can't find any testactivity for studentId ${entity.studentId}`);
        }
      });
      return nextState;

    case REALTIME_GRADEBOOK_TEST_ACTIVITY_SUBMIT:
      nextState = produce(state, _st => {
        const { testActivityId } = payload;
        const entityIndex = _st.entities.findIndex(x => x.testActivityId === testActivityId);
        if (entityIndex != -1) {
          _st.entities[entityIndex].status = "submitted";
        }
      });
      return nextState;
    case REALTIME_GRADEBOOK_TEST_ITEM_ADD:
      nextState = produce(state, _st => {
        for (const { testActivityId, score, maxScore, ...questionItem } of payload) {
          const entityIndex = _st.entities.findIndex(x => x.testActivityId === testActivityId);
          if (entityIndex != -1) {
            console.log("entityIndex", entityIndex);
            const itemIndex = _st.entities[entityIndex].questionActivities.findIndex(x => x._id == questionItem._id);
            if (itemIndex == -1) {
              console.warn(`can't find any questionItem for id ${testActivityId}`);
            } else {
              _st.entities[entityIndex].questionActivities[itemIndex] = questionItem;
            }
            if (score) {
              _st.entities[entityIndex].score += score;
            }
          } else {
            console.warn(`can't find any testactivity for testActivityId ${testActivityId}`);
          }
        }
      });
      return nextState;
    case RECEIVE_TESTACTIVITY_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
