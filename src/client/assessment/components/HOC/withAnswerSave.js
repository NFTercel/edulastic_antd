import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { setUserAnswerAction } from "../../actions/answers";
import { getAnswerByQuestionIdSelector } from "../../selectors/answers";

const getQuestionId = questionId => questionId || "tmp";

export default WrappedComponent => {
  const hocComponent = ({ setUserAnswer, testItemId, ...props }) => {
    const { data: question } = props;
    const questionId = getQuestionId(question.id);

    return (
      <WrappedComponent
        saveAnswer={data => {
          setUserAnswer(questionId, data);
        }}
        questionId={questionId}
        {...props}
      />
    );
  };

  hocComponent.propTypes = {
    setUserAnswer: PropTypes.func.isRequired
  };

  const enhance = compose(
    withRouter,
    connect(
      (state, data) => {
        const { questionId: qId, activity } = data;
        if (!qId) return {};
        let userAnswer;
        if (activity && activity.userResponse) {
          userAnswer = activity.userResponse;
        } else {
          userAnswer = getAnswerByQuestionIdSelector(getQuestionId(qId))(state);
        }

        return {
          userAnswer,
          evaluation: state.evaluation[getQuestionId(qId)]
        };
      },
      { setUserAnswer: setUserAnswerAction }
    )
  );

  return enhance(hocComponent);
};
