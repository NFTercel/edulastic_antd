//@ts-check
import React from "react";

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
  removeQuestions,
  addQuestionsMaxScore
}) => {
  const client = useRealtimeUpdates(`gradebook:${classId}:${assignmentId}`, {
    addActivity,
    addItem,
    submitActivity
    //TODO: need to comeback to it when we need to handle realtime impact of regrading
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
