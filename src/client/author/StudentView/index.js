/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";

import {
  StyledFlexContainer,
  AllButton,
  CorrectButton,
  WrongButton,
  PartiallyCorrectButton,
  GiveOverallFeedBackButton,
  StudentButtonDiv
} from "./styled";

import ClassQuestions from "../ClassResponses/components/Container/ClassQuestions";

// actions
import { receiveAnswersAction } from "../src/actions/classBoard";
// selectors
import { getAssignmentClassIdSelector, getClassQuestionSelector } from "../ClassBoard/ducks";

class StudentViewContainer extends Component {
  render() {
    const {
      classResponse, // : { testItems, ...others },
      testActivity,
      question,
      classQuestion,
      studentItems,
      studentResponse
    } = this.props;

    const userId = studentResponse.testActivity ? studentResponse.testActivity.userId : "";
    const currentStudent = studentItems.find(({ studentId }) => studentId === userId);

    return (
      <React.Fragment>
        <StyledFlexContainer justifyContent="space-between">
          <StudentButtonDiv>
            <AllButton active>ALL</AllButton>
            <CorrectButton>CORRECT</CorrectButton>
            <WrongButton>WRONG</WrongButton>
            <PartiallyCorrectButton>PARTIALLY CORRECT</PartiallyCorrectButton>
          </StudentButtonDiv>
          <GiveOverallFeedBackButton active>GIVE OVERALL FEEDBACK</GiveOverallFeedBackButton>
        </StyledFlexContainer>
        <ClassQuestions
          currentStudent={currentStudent || []}
          questionActivities={studentResponse.questionActivities}
          classResponse={classResponse}
        />
      </React.Fragment>
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      classQuestion: getClassQuestionSelector(state),
      assignmentIdClassId: getAssignmentClassIdSelector(state)
    }),
    {
      loadClassQuestionResponses: receiveAnswersAction
    }
  )
);
export default enhance(StudentViewContainer);

StudentViewContainer.propTypes = {
  classResponse: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  testActivity: PropTypes.array.isRequired,
  classQuestion: PropTypes.array,
  studentItems: PropTypes.array.isRequired,
  studentResponse: PropTypes.object.isRequired
};
StudentViewContainer.defaultProps = {
  classQuestion: []
};
