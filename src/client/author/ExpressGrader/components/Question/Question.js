import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { receiveStudentQuestionAction } from "../../../src/actions/classBoard";
import {
  getClassResponseSelector,
  getAdditionalDataSelector,
  getAssignmentClassIdSelector,
  getStudentQuestionSelector
} from "../../../ClassBoard/ducks";
import ClassQuestions from "../../../ClassResponses/components/Container/ClassQuestions";

class Question extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const {
      record,
      loadStudentQuestionResponses,
      assignmentClassId: { assignmentId, classId }
    } = this.props;
    const { testActivityId, studentId, _id } = record;
    if (testActivityId) {
      loadStudentQuestionResponses(assignmentId, classId, _id, studentId);
    }
  }

  render() {
    let isEmpty = true;
    const { classResponse, record, studentQuestion } = this.props;
    const currentStudent = {
      studentName: ""
    };
    isEmpty = !Object.keys(studentQuestion).length;
    const { testItems = [], ...others } = classResponse;
    const selectedItems = testItems.filter(
      ({ data: { questions = [] } = {} }) => questions.filter(({ id }) => id === record._id).length > 0
    );
    if (isEmpty) {
      return null;
    }
    return (
      <ClassQuestions
        currentStudent={currentStudent}
        questionActivities={studentQuestion ? [studentQuestion] : []}
        classResponse={{ testItems: selectedItems, ...others }}
      />
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      classResponse: getClassResponseSelector(state),
      additionalData: getAdditionalDataSelector(state),
      assignmentClassId: getAssignmentClassIdSelector(state),
      studentQuestion: getStudentQuestionSelector(state)
    }),
    {
      loadStudentQuestionResponses: receiveStudentQuestionAction
    }
  )
);

Question.propTypes = {
  record: PropTypes.object.isRequired,
  loadStudentQuestionResponses: PropTypes.func.isRequired,
  assignmentClassId: PropTypes.object,
  studentQuestion: PropTypes.object,
  classResponse: PropTypes.object,
  additionalData: PropTypes.object
};

export default enhance(Question);
