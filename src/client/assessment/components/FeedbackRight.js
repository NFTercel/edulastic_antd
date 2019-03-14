import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Avatar, Card, Button, Input } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";

import { withWindowSizes } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { getUserSelector } from "../../author/src/selectors/user";
import { receiveFeedbackResponseAction } from "../../author/src/actions/classBoard";

const { TextArea } = Input;

class FeedbackRight extends Component {
  constructor(props) {
    super(props);
    const {
      widget: { activity }
    } = this.props;
    let feedback = "";
    let score = 0;
    let maxScore = 1;
    if (activity) {
      const {
        feedback: { text: _feedback },
        score: _score,
        maxScore: _maxScore
      } = activity;
      feedback = _feedback;
      score = _score;
      maxScore = _maxScore;
    }
    this.state = {
      score,
      maxScore,
      feedback
    };
  }

  onFeedbackSubmit = () => {
    const { score, feedback } = this.state;
    const {
      user,
      loadFeedbackResponses,
      widget: { id, activity }
    } = this.props;
    const { testActivityId, groupId } = activity;
    if (!id || !user || !user.user || !testActivityId) {
      return;
    }
    loadFeedbackResponses({
      body: {
        score,
        feedback: {
          teacherId: user.user._id,
          teacherName: user.user.firstName,
          text: feedback
        },
        groupId
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
    const { studentName } = this.props;
    const { score, maxScore, feedback } = this.state;
    const { t, user } = this.props;
    const isError = maxScore < score;
    const isStudentName = studentName !== undefined && studentName.length !== 0;
    let title;

    if (isStudentName) {
      title = (
        <TitleDiv style={{ marginTop: 0 }}>
          <Avatar
            style={{ verticalAlign: "middle", background: "#fff", color: "green", border: "1px solid green" }}
            size="small"
          >
            {studentName.charAt(0)}
          </Avatar>
          &nbsp;
          {studentName}
        </TitleDiv>
      );
    } else {
      title = null;
    }

    return (
      <StyledCardTwo bordered={isStudentName} title={title}>
        <StyledDivSec>
          <ScoreInputWrapper>
            <ScoreInput onChange={this.onChangeScore} onBlur={this.onFeedbackSubmit} value={score} />
            <TextPara> / {maxScore}</TextPara>
          </ScoreInputWrapper>
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
          </Fragment>
        )}
      </StyledCardTwo>
    );
  }
}

FeedbackRight.propTypes = {
  widget: PropTypes.shape({
    evaluation: PropTypes.object
  }).isRequired,
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

const StyledCardTwo = styled(Card)`
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
  display: inline-block;
  margin: 0px 0 auto 32px;
  min-width: 250px;
`;

const StyledDivSec = styled.div`
  height: 50px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const ScoreInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ScoreInput = styled(Input)`
  width: 70%;
  height: 40px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 1.8em;
  font-weight: bold;
  display: inline-block;
`;

const TextPara = styled.p`
  padding-left: 10px;
  padding-right: 15px;
  font-size: 1.8em;
  font-weight: bold;
  display: inline-block;
  background: #f0f2f5;
  height: 40px;
  width: 30%;
  border: 1px solid #eaeaea;
  border-left: 0;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;

const LeaveDiv = styled.div`
  margin: 20px 0px;
  font-weight: bold;
  color: #545b6b;
  font-size: 0.9em;
`;

const TitleDiv = styled.div`
  font-weight: bold;
  color: #545b6b;
  font-size: 1em;
  display: flex;
`;

const FeedbackInput = styled(TextArea)`
  width: 100%;
  height: 160px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  display: inline-block;
`;

const SolutionButton = styled(Button)`
  font-size: 1em;
  margin: 10px 0px;
  width: 100%;
  padding: 13px 5px 20px;
  color: white;
  height: 45px;
  background-color: #00b0ff;
  font-weight: bold;
`;
