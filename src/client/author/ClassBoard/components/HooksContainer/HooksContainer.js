//@ts-check
import React from "react";

import { connect } from "react-redux";
import {
  realtimeGradebookActivityAddAction,
  realtimeGradebookTestItemAddAction,
  realtimeGradebookActivitySubmitAction,
  realtimeGradebookQuestionAddMaxScoreAction,
  realtimeGradebookQuestionsRemoveAction,
  realtimeGradebookRedirectAction
} from "../../../src/reducers/testActivity";
import useRealtimeUpdates from "../../useRealtimeUpdates";

const Shell = ({
  addActivity,
  classId,
  assignmentId,
  addItem,
  submitActivity,
  removeQuestions,
  addQuestionsMaxScore,
  redirect
}) => {
  const client = useRealtimeUpdates(`gradebook:${classId}:${assignmentId}`, {
    addActivity,
    addItem,
    submitActivity,
    redirect
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
    addQuestionsMaxScore: realtimeGradebookQuestionAddMaxScoreAction,
    redirect: realtimeGradebookRedirectAction
  }
)(Shell);
