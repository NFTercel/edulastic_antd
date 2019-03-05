//@ts-check
import React from "react";

import { connect } from "react-redux";
import {
  realtimeGradebookActivityAddAction,
  realtimeGradebookTestItemAddAction,
  realtimeGradebookActivitySubmitAction
} from "../../../src/reducers/testActivity";
import useRealtimeUpdates from "../../useRealtimeUpdates";

const Shell = ({ addActivity, classId, assignmentId, addItem, submitActivity }) => {
  const client = useRealtimeUpdates(`gradebook:${classId}:${assignmentId}`, {
    addActivity,
    addItem,
    submitActivity
  });

  return null;
};

export default connect(
  null,
  {
    addActivity: realtimeGradebookActivityAddAction,
    addItem: realtimeGradebookTestItemAddAction,
    submitActivity: realtimeGradebookActivitySubmitAction
  }
)(Shell);
