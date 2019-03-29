// @ts-check
import { connect } from "react-redux";
import {
  realtimeGradebookActivityAddAction,
  realtimeGradebookTestItemAddAction,
  realtimeGradebookActivitySubmitAction,
  realtimeGradebookQuestionAddMaxScoreAction,
  realtimeGradebookQuestionsRemoveAction
} from "../../../src/reducers/testActivity";
import useRealtimeUpdates from "../../useRealtimeUpdates";

const Shell = ({
  addActivity,
  classId,
  assignmentId,
  addItem,
  submitActivity,
  // eslint-disable-next-line
  removeQuestions,
  // eslint-disable-next-line
  addQuestionsMaxScore
}) => {
  // eslint-disable-next-line
  const client = useRealtimeUpdates(`gradebook:${classId}:${assignmentId}`, {
    addActivity,
    addItem,
    submitActivity
    // TODO: need to comeback to it when we need to handle realtime impact of regrading
    // removeQuestions,
    // addQuestionsMaxScore
  });

  return null;
};

export default connect(
  null,
  {
    addActivity: realtimeGradebookActivityAddAction,
    addItem: realtimeGradebookTestItemAddAction,
    submitActivity: realtimeGradebookActivitySubmitAction,
    removeQuestions: realtimeGradebookQuestionsRemoveAction,
    addQuestionsMaxScore: realtimeGradebookQuestionAddMaxScoreAction
  }
)(Shell);
