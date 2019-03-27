import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import StudentQuestions from "../StudentQuestions/StudentQuestions";
import { StyledStudentDiv } from "./styled";

// actions
import { receiveStudentResponseAction, receiveClassResponseAction } from "../../../src/actions/classBoard";
// selectors
import {
  getClassResponseSelector,
  getStudentResponseSelector,
  getTestActivitySelector,
  getAdditionalDataSelector,
  getAssignmentClassIdSelector
} from "../../../ClassBoard/ducks";

class PrintStudent extends Component {
  componentDidMount() {
    const {
      loadStudentResponses,
      testActivityId,
      testActivity,
      additionalData,
      history,
      loadClassResponses
    } = this.props;
    if (testActivity.length === 0) {
      history.goBack();
    }
    const { testId, classId } = additionalData;
    loadStudentResponses({ testActivityId, groupId: classId });
    loadClassResponses({ testId });
  }

  render() {
    let totalScore = 0;
    let totalMaxScore = 0;
    const data = [];
    const { testActivity: studentItems } = this.props;
    const { classResponse, additionalData, studentResponse, loadStudentResponses, creating } = this.props;
    const testActivity = studentResponse ? studentResponse.testActivity : null;
    const questionActivities = studentResponse ? studentResponse.questionActivities : null;
    const showClassQuestions = !!testActivity;

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
    const testActivityId = testActivity ? testActivity._id : "";
    const userId = testActivity ? testActivity.userId : "";
    const classassignment = classResponse ? classResponse.title : "";
    const classname = additionalData ? additionalData.className : "";
    const classnames = [{ name: classname }];
    const currentStudent = studentItems.find(({ studentId }) => studentId === userId);
    const studentName = currentStudent ? currentStudent.studentName : "";
    const { assignmentIdClassId } = this.props;
    assignmentId = assignmentId || assignmentIdClassId.assignmentId;
    groupId = groupId || assignmentIdClassId.classId;

    return (
      <StyledStudentDiv>
        {showClassQuestions && (
          <StudentQuestions
            currentStudent={currentStudent || []}
            questionActivities={studentResponse.questionActivities}
            classResponse={classResponse}
          />
        )}
      </StyledStudentDiv>
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      classResponse: getClassResponseSelector(state),
      studentResponse: getStudentResponseSelector(state),
      testActivity: getTestActivitySelector(state),
      additionalData: getAdditionalDataSelector(state),
      assignmentIdClassId: getAssignmentClassIdSelector(state)
    }),
    {
      loadStudentResponses: receiveStudentResponseAction,
      loadClassResponses: receiveClassResponseAction
    }
  )
);

export default enhance(PrintStudent);

/* eslint-disable react/require-default-props */
PrintStudent.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  classResponse: PropTypes.object,
  studentResponse: PropTypes.object,
  testActivity: PropTypes.array,
  additionalData: PropTypes.object,
  loadStudentResponses: PropTypes.func,
  creating: PropTypes.object,
  assignmentIdClassId: PropTypes.object,
  loadClassResponses: PropTypes.func
};
