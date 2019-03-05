import React, { useEffect } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { gotoItem, saveUserResponse } from "../actions/items";
import { finishTestAcitivityAction } from "../actions/test";
import { evaluateAnswer } from "../actions/evaluation";
import { changePreview as changePreviewAction } from "../actions/view";
import { startAssessmentAction } from "../actions/assessment";
import AssesmentPlayerDefault from "./AssessmentPlayerDefault";
import AssesmentPlayerSimple from "./AssessmentPlayerSimple";

const AssessmentContainer = ({
  view,
  items,
  title,
  defaultAP,
  finishTest,
  history,
  changePreview,
  startAssessment,
  saveUserResponse: saveUser,
  evaluateAnswer: evaluate,
  match,
  url,
  gotoItem
}) => {
  let { qid = 0 } = match.params;
  let currentItem = Number(qid);
  gotoItem(currentItem);
  const isLast = () => currentItem === items.length - 1;
  const isFirst = () => currentItem === 0;

  // start assessment
  useEffect(() => {
    startAssessment();
  }, []);

  const gotoQuestion = index => {
    history.push(`${url}/qid/${index}`);
    saveUser(currentItem);
    changePreview("clear");
  };

  const moveToNext = () => {
    if (!isLast()) {
      gotoQuestion(Number(currentItem) + 1);
    }
    if (isLast()) {
      saveUser(currentItem);
      history.push("/student/test-summary");
    }
  };

  const moveToPrev = () => {
    if (!isFirst()) gotoQuestion(Number(currentItem) - 1);
  };

  const itemRows = items[currentItem] && items[currentItem].rows;

  const props = {
    items,
    isFirst,
    isLast,
    moveToNext,
    moveToPrev,
    currentItem,
    title,
    gotoQuestion,
    itemRows,
    evaluate,
    view,
    finishTest,
    history
  };

  return defaultAP ? <AssesmentPlayerDefault {...props} /> : <AssesmentPlayerSimple {...props} />;
};

AssessmentContainer.propTypes = {
  gotoItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

const enhance = compose(
  withRouter,
  connect(
    state => ({
      view: state.view.preview,
      items: state.test.items,
      title: state.test.title
    }),
    {
      saveUserResponse,
      evaluateAnswer,
      changePreview: changePreviewAction,
      startAssessment: startAssessmentAction,
      finishTest: finishTestAcitivityAction,
      gotoItem
    }
  )
);

export default enhance(AssessmentContainer);
