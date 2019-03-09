/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { StyledText, StyledWrapper } from "./styled";

class QuestionScore extends Component {
  constructor() {
    super();
  }

  getScoreColor(value, maxScore) {
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

  render() {
    let score;
    let maxScore;
    let studentScore;
    const { question, tableData, showQuestionModal } = this.props;
    const isQuestion = question && question.score !== undefined && question.maxScore !== undefined;
    if (isQuestion) {
      score = question.score;
      maxScore = question.maxScore;
      studentScore = question.score;
    } else {
      score = 0;
      maxScore = 0;
      studentScore = "-";
    }

    return (
      <StyledWrapper onClick={() => showQuestionModal(question, tableData)}>
        <StyledText color={this.getScoreColor(score, maxScore)}>{studentScore}</StyledText>
      </StyledWrapper>
    );
  }
}

export default QuestionScore;
