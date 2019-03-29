import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyledText, StyledWrapper } from "./styled";

// function getScoreColor(value, maxScore) {
//   let color;
//   switch (value) {
//     case 0:
//       color = "red";
//       break;
//     case maxScore:
//       color = "green";
//       break;
//     default:
//       color = "yellow";
//       break;
//   }
//   return color;
// }

class QuestionScore extends Component {
  render() {
    const { question, tableData, showQuestionModal, isTest } = this.props;
    const isQuestion = question && question.score !== undefined && question.maxScore !== undefined;
    let { score: studentScore } = question; // score, maxScore,
    if (!isQuestion) {
      // score = 0;
      // maxScore = 1;
      studentScore = "-";
    }

    return (
      <React.Fragment>
        {isTest ? (
          <StyledWrapper onClick={() => showQuestionModal(question, tableData)}>
            {/* color={getScoreColor(score, maxScore)} */}
            <StyledText>{studentScore}</StyledText>
          </StyledWrapper>
        ) : (
          <StyledWrapper>
            <StyledText>-</StyledText>
          </StyledWrapper>
        )}
      </React.Fragment>
    );
  }
}

QuestionScore.propTypes = {
  question: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired,
  showQuestionModal: PropTypes.func.isRequired,
  isTest: PropTypes.string
};

QuestionScore.defaultProps = {
  isTest: ""
};

export default QuestionScore;
