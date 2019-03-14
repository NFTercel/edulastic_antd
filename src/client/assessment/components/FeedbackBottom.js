import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "antd";

import { connect } from "react-redux";
import { compose } from "redux";

import { withWindowSizes } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { getUserSelector } from "../../author/src/selectors/user";
import { receiveFeedbackResponseAction } from "../../author/src/actions/classBoard";

const { TextArea } = Input;

class FeedbackBottom extends Component {
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
      feedback = _feedback || "";
      score = _score || 0;
      maxScore = _maxScore || 1;
    }
    this.state = {
      score,
      maxScore,
      feedback
    };
  }

  onChangeScore = e => {
    this.setState({ score: e.target.value });
  };

  onChangeFeedback = e => {
    this.setState({ feedback: e.target.value });
  };

  onSaveFeedback = () => {
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

  render() {
    const { score, maxScore, feedback } = this.state;
    const isError = maxScore < score;

    return (
      <StyledQuestionDiv>
        <TextParaTeacher>
          <ScoreContainer>
            <ScoreTitle>Score:</ScoreTitle>
            <ScoreContent>
              <InputScore defaultValue={score} onChange={this.onChangeScore} onBlur={this.onSaveFeedback} />
              <ScoreLine />
              <MaxScore>{maxScore}</MaxScore>
            </ScoreContent>
          </ScoreContainer>
        </TextParaTeacher>
        {!isError ? (
          <FeedbackText>
            Teacher Feedback:
            <InputFeedback
              placeholder="No Feedback given"
              defaultValue={feedback}
              onChange={this.onChangeFeedback}
              onBlur={this.onSaveFeedback}
            />
          </FeedbackText>
        ) : (
          <TextParaTeacher>Score is to large</TextParaTeacher>
        )}
      </StyledQuestionDiv>
    );
  }
}

FeedbackBottom.propTypes = {
  widget: PropTypes.shape({ evaluation: PropTypes.object }).isRequired,
  loadFeedbackResponses: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  testItemId: PropTypes.string.isRequired
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
export default enhance(FeedbackBottom);

const TextParaTeacher = styled.div`
  display: flex;
  padding-top: 10px;
`;

const StyledQuestionDiv = styled.div`
  width: 40%;
  margin-top: 30px;
  margin-left: 20px;
  @media (max-width: 1900px) {
    width: calc(100% - 40px);
    display: block;
  }
`;

const ScoreContainer = styled.div`
  width: 90%;
  display: flex;
`;

const ScoreContent = styled.div`
  width: 20%;
  padding: 20px 20px;
`;
const ScoreTitle = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  display: inline-block;
  padding: 56px 0px 56px 30px;
`;

const FeedbackText = styled.div`
  display: flex;
  font-size: 1.4em;
  font-weight: bold;
  padding: 0px 0px 36px 30px;
  width: 100%;
`;

const ScoreLine = styled.div`
  width: 60%;
  margin: auto;
  height: 4px;
  background-color: #515151;
  min-width: 100px;
`;

const InputScore = styled(Input)`
  font-size: 2.5em;
  font-weight: bold;
  width: 100%;
  text-align: center;
  border: none;
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const MaxScore = styled.p`
  font-size: 2.5em;
  font-weight: bold;
  width: 100%;
  text-align: center;
  min-width: 100px;
`;

const InputFeedback = styled(TextArea)`
  flex: auto;
  width: auto;
  height: 77px !important;
  display: inline-block;
  margin-left: 20px;
  color: gray;
  font-size: 0.8em;
  border: none;
`;
