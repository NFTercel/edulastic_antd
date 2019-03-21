import {
  RECEIVE_TESTACTIVITY_REQUEST,
  RECEIVE_TESTACTIVITY_SUCCESS,
  RECEIVE_TESTACTIVITY_ERROR
} from "../constants/actions";
import { transformGradeBookResponse, getMaxScoreOfQid } from "../../ClassBoard/Transformer";

import { createAction } from "redux-starter-kit";
import { produce } from "immer";

export const REALTIME_GRADEBOOK_TEST_ACTIVITY_ADD = "[gradebook] realtime test activity add";
export const REALTIME_GRADEBOOK_TEST_ACTIVITY_SUBMIT = "[gradebook] realtime test activity submit";
export const REALTIME_GRADEBOOK_TEST_ITEM_ADD = "[gradebook] realtime test item add";

export const REALTIME_GRADEBOOK_TEST_QUESTION_REMOVE = "[gradebook] realtime test question remove";
export const REALTIME_GRADEBOOK_TEST_QUESTION_ADD_MAXSCORE = "[gradebook] realtime test question add max score";

export const realtimeGradebookActivityAddAction = createAction(REALTIME_GRADEBOOK_TEST_ACTIVITY_ADD);
export const realtimeGradebookActivitySubmitAction = createAction(REALTIME_GRADEBOOK_TEST_ACTIVITY_SUBMIT);
export const realtimeGradebookTestItemAddAction = createAction(REALTIME_GRADEBOOK_TEST_ITEM_ADD);
export const realtimeGradebookQuestionsRemoveAction = createAction(REALTIME_GRADEBOOK_TEST_QUESTION_REMOVE);
export const realtimeGradebookQuestionAddMaxScoreAction = createAction(REALTIME_GRADEBOOK_TEST_QUESTION_ADD_MAXSCORE);

const initialState = {
  entities: [],
  error: null,
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  let nextState;
  switch (type) {
    case RECEIVE_TESTACTIVITY_REQUEST:
      return { ...state, loading: true, assignmentId: payload.assignmentId, classId: payload.classId };
    case RECEIVE_TESTACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.gradebookData,
        entities: transformGradeBookResponse(payload.gradebookData),
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

    case REALTIME_GRADEBOOK_TEST_QUESTION_REMOVE:
      nextState = produce(state, _st => {
        /**
         * @type string[]
         */
        const questionIds = payload;
        let questionIdsMaxScore = {};
        for (let qid of questionIds) {
          questionIdsMaxScore[qid] = getMaxScoreOfQid(qid, _st.data.testItemsData);
        }
        for (let entity of _st.entities) {
          const matchingQids = entity.questionActivities.filter(x => questionIds.includes(x._id));
          entity.maxScore -= matchingQids.reduce((prev, qid) => prev + (questionIdsMaxScore[qid] || 0), 0);
          entity.questionActivities = entity.questionActivities.filter(x => !questionIds.includes(x._id));
        }
      });
      return nextState;
    case REALTIME_GRADEBOOK_TEST_QUESTION_ADD_MAXSCORE:
      nextState = produce(state, _st => {
        let questionIdsMaxScore = {};
        for (let { qid, maxScore } of payload) {
          questionIdsMaxScore[qid] = maxScore;
        }
        const questionIds = payload.map(x => x.qid);
        for (let entity of _st.entities) {
          const matchingQids = entity.questionActivities.filter(x => questionIds.includes(x._id));
          entity.maxScore += matchingQids.reduce((prev, qid) => prev + (questionIdsMaxScore[qid] || 0), 0);
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
              _st.entities[entityIndex].questionActivities.push(questionItem);
              // console.warn(`can't find any questionItem for id ${testActivityId}`);
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
