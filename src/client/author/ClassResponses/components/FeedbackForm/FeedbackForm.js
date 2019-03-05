import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { compose } from "redux";

import { withWindowSizes } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { getUserSelector } from "../../../src/selectors/user";
import { receiveFeedbackResponseAction } from "../../../src/actions/classBoard";

import { SolutionButton, StyledCardTwo, FeedbackInput, StyledDivSec, ScoreInput, TextPara, LeaveDiv } from "./styled";

class FeedbackRight extends Component {
  constructor(props) {
    super(props);
    let feedback = "";
    let score = 0;
    let maxScore = 1;

    this.state = {
      score,
      maxScore,
      feedback
    };
  }

  onFeedbackSubmit = () => {
    const { score, feedback } = this.state;
    const { user, loadFeedbackResponses } = this.props;

    loadFeedbackResponses({
      body: {
        score,
        feedback: {
          teacherId: user.user._id,
          teacherName: user.user.firstName,
          text: feedback
        }
      },
      testActivityId,
      questionId: id
    });
  };

  onChangeScore = e => {
    this.setState({ score: e.target.value });
  };

  onChangeFeedback = e => {
    this.setState({ feedback: e.target.value });
  };

  render() {
    const { score, maxScore, feedback } = this.state;
    const isError = maxScore < score;
    const { t } = this.props;
    return (
      <StyledCardTwo bordered={false}>
        <StyledDivSec>
          <ScoreInput onChange={this.onChangeScore} onBlur={this.onFeedbackSubmit} value={score} />
          <TextPara> / {maxScore}</TextPara>
        </StyledDivSec>
        <LeaveDiv>{isError ? "Score is to large" : "Leave a Feedback!"}</LeaveDiv>
        {!isError && (
          <Fragment>
            <FeedbackInput
              onChange={this.onChangeFeedback}
              onBlur={this.onFeedbackSubmit}
              value={feedback}
              style={{ height: 240 }}
            />
            <SolutionButton onClick={this.onFeedbackSubmit}>UPDATE</SolutionButton>
          </Fragment>
        )}
      </StyledCardTwo>
    );
  }
}

FeedbackRight.propTypes = {
  testItemId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  loadFeedbackResponses: PropTypes.func.isRequired
};

const enhance = compose(
  withWindowSizes,
  withNamespaces("header"),
  connect(
    state => ({
      user: getUserSelector(state)
    }),
    {
      loadFeedbackResponses: receiveFeedbackResponseAction
    }
  )
);
export default enhance(FeedbackRight);
