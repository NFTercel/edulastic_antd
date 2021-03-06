import React, { useEffect } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spin } from "antd";
import { isUndefined } from "lodash";

import { gotoItem, saveUserResponse } from "../actions/items";
import { finishTestAcitivityAction } from "../actions/test";
import { evaluateAnswer } from "../actions/evaluation";
import { changePreview as changePreviewAction } from "../actions/view";
import { getQuestionsByIdSelector } from "../selectors/questions";
import { testLoadingSelector } from "../selectors/test";
import { startAssessmentAction } from "../actions/assessment";
import { getAnswersArraySelector, getAnswersListSelector } from "../selectors/answers";
import AssessmentPlayerDefault from "./AssessmentPlayerDefault";
import AssessmentPlayerSimple from "./AssessmentPlayerSimple";
import AssessmentPlayerDocBased from "./AssessmentPlayerDocBased";

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
  gotoItem,
  docUrl,
  annotations,
  questionsById,
  answers,
  answersById,
  loading
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

  const saveProgress = () => {
    saveUser(currentItem);
  };

  const gotoSummary = () => {
    saveUser(currentItem);
    history.push("/student/test-summary");
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

  if (loading) {
    return <Spin />;
  }

  if (!isUndefined(docUrl)) {
    return (
      <AssessmentPlayerDocBased
        docUrl={docUrl}
        annotations={annotations}
        questionsById={questionsById}
        answers={answers}
        answersById={answersById}
        saveProgress={saveProgress}
        gotoSummary={gotoSummary}
        {...props}
      />
    );
  }

  return defaultAP ? <AssessmentPlayerDefault {...props} /> : <AssessmentPlayerSimple {...props} />;
};

AssessmentContainer.propTypes = {
  gotoItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  docUrl: PropTypes.string,
  annotations: PropTypes.array,
  answers: PropTypes.array.isRequired,
  answersById: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

AssessmentContainer.defaultProps = {
  docUrl: undefined,
  annotations: []
};

const enhance = compose(
  withRouter,
  connect(
    state => ({
      view: state.view.preview,
      items: state.test.items,
      title: state.test.title,
      docUrl: state.test.docUrl,
      annotations: state.test.annotations,
      questionsById: getQuestionsByIdSelector(state),
      answers: getAnswersArraySelector(state),
      answersById: getAnswersListSelector(state),
      loading: testLoadingSelector(state)
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
