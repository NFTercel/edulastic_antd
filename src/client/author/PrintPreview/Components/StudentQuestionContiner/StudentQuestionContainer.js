import React, { Component } from "react";
import PropTypes from "prop-types";
// actions

// components
import StudentQuestions from "../StudentQuestions/StudentQuestions";
// styled wrappers
import {
  StyledStudentQuestion,
  StudentQuestionHeader,
  StudentInformation,
  InfoItem,
  TimeContainer,
  Color,
  TimeItem,
  ScoreContainer,
  ScoreLabel,
  TotalScore,
  FractionLine
} from "./styled";

class StudentQuestionContainer extends Component {
  render() {
    let totalScore = 0;
    let totalMaxScore = 0;
    const data = [];
    const { testActivity: studentItems } = this.props;
    const { classResponse, additionalData, studentResponse } = this.props;
    const testActivity = studentResponse ? studentResponse.testActivity : null;
    const questionActivities = studentResponse ? studentResponse.questionActivities : null;

    if (questionActivities) {
      questionActivities.forEach((item, i) => {
        totalScore += item.score || 0;
        totalMaxScore += item.maxScore || 1;
        data.push({
          id: item._id,
          name: `Q${i + 1}`,
          red: (item.maxScore || 1) - (item.score || 0),
          green: item.score || 0,
          all: item.maxScore || 1
        });
      });
    }

    let assignmentId = testActivity ? testActivity.assignmentId : "";
    let groupId = testActivity ? testActivity.groupId : "";
    const userId = testActivity ? testActivity.userId : "";
    const classname = additionalData ? additionalData.className : "";
    const currentStudent = studentItems.find(({ studentId }) => studentId === userId);
    const studentName = currentStudent ? currentStudent.studentName : "";
    const { assignmentIdClassId } = this.props;
    assignmentId = assignmentId || assignmentIdClassId.assignmentId;
    groupId = groupId || assignmentIdClassId.classId;
    return (
      <StyledStudentQuestion>
        <StudentQuestionHeader>
          <StudentInformation>
            <InfoItem>
              <Color>StudentName: </Color>
              {studentName}
            </InfoItem>
            <InfoItem>
              <Color>Classname: </Color>
              {classname}
            </InfoItem>
          </StudentInformation>
          <TimeContainer>
            <TimeItem>
              <Color>Time:</Color> 1:54
            </TimeItem>
            <TimeItem>
              <Color>Status:</Color> Graded
            </TimeItem>
            <TimeItem>
              <Color>Submitted on:</Color> 19 October,2018
            </TimeItem>
            <TimeItem>
              <Color>Hour:</Color> 03:13
            </TimeItem>
          </TimeContainer>

          <ScoreContainer>
            <ScoreLabel>TOTAL SCORE</ScoreLabel>
            <TotalScore>{totalScore}</TotalScore>
            <FractionLine />
            <TotalScore>{totalMaxScore}</TotalScore>
          </ScoreContainer>
        </StudentQuestionHeader>

        {!!studentResponse && (
          <StudentQuestions
            currentStudent={currentStudent || []}
            questionActivities={studentResponse.questionActivities}
            classResponse={classResponse}
          />
        )}
      </StyledStudentQuestion>
    );
  }
}

export default StudentQuestionContainer;

/* eslint-disable react/require-default-props */
StudentQuestionContainer.propTypes = {
  classResponse: PropTypes.object,
  studentResponse: PropTypes.object,
  testActivity: PropTypes.array,
  additionalData: PropTypes.object,
  assignmentIdClassId: PropTypes.object
};
