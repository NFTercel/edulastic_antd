import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyledText, StyledWrapper } from "./styled";

function getScoreColor(value, maxScore) {
  let color;
  switch (value) {
    case 0:
      color = "red";
      break;
    case maxScore:
      color = "green";
      break;
    default:
      color = "yellow";
      break;
  }
  return color;
}

class QuestionScore extends Component {
  render() {
    const { question, tableData, showQuestionModal } = this.props;
    const isQuestion = question && question.score !== undefined && question.maxScore !== undefined;
    let { score, maxScore, score: studentScore } = question;
    if (!isQuestion) {
      score = 0;
      maxScore = 1;
      studentScore = "-";
    }

    return (
      <StyledWrapper onClick={() => showQuestionModal(question, tableData)}>
        <StyledText color={getScoreColor(score, maxScore)}>{studentScore}</StyledText>
      </StyledWrapper>
    );
  }
}

QuestionScore.propTypes = {
  question: PropTypes.object.isRequired,
  tableData: PropTypes.object.isRequired,
  showQuestionModal: PropTypes.func.isRequired
};

export default QuestionScore;
