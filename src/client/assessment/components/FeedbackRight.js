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
      const { score: _score, maxScore: _maxScore } = activity;
      feedback = activity.feedback ? feedback.text : "";
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
          <Avatar style={{ verticalAlign: "middle", background: "#E7F1FD", color: "#1774F0" }} size={34}>
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
            <TextPara> {maxScore}</TextPara>
          </ScoreInputWrapper>
        </StyledDivSec>
        <LeaveDiv>{isError ? "Score is to large" : "Live a feedback:"}</LeaveDiv>
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
        <UpdateButton>UPDATE</UpdateButton>
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
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 0px 0px 0px 20px;
  min-width: 250px;
  min-height: 100%;
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
  text-align: center;
`;

const ScoreInput = styled(Input)`
  width: 70%;
  height: 47px;
  border: 0px;
  background-color: #f8f8f8;
  border-radius: 2px;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  display: inline-block;
`;

const TextPara = styled.p`
  padding-left: 10px;
  padding-right: 15px;
  font-size: 32px;
  background-color: #ececec;
  font-weight: 600;
  height: 47px;
  width: 30%;
  border-radius: 0px 2px 2px 0px;
  display: inline-block;
`;

const LeaveDiv = styled.div`
  margin: 20px 0px;
  font-weight: 600;
  color: #7c848e;
  font-size: 13px;
`;

const TitleDiv = styled.div`
  font-weight: 600;
  color: #7c848e;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const FeedbackInput = styled(TextArea)`
  width: 100%;
  height: 160px;
  border: 0;
  border-radius: 2px;
  display: inline-block;
  background: #f8f8f8;
`;

const UpdateButton = styled(Button)`
  font-size: 11px;
  margin: 20px 0px 0px;
  width: 100%;
  height: 32px;
  font-weight: 600;
  color: #1774f0;
  background-color: #ffffff;
  border: 1px #1774f0 solid;
  text-transform: uppercase;
  &:hover {
    color: #ffffff;
    background-color: #1774f0;
  }
`;
