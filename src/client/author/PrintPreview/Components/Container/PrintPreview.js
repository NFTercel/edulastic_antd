import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { get } from "lodash";
import * as moment from "moment";
import StudentQuestionContainer from "../StudentQuestionContiner/StudentQuestionContainer";
const html2canvas = require("html2canvas");

import {
  PrintPreviewBack,
  PrintPreviewContainer,
  PagePrinterHeader,
  TestInfo,
  InfoItem,
  StyledTitle,
  Color
} from "./styled";

// actions
import { receiveClassStudentResponseAction, receiveClassResponseAction } from "../../../src/actions/classBoard";
// selectors
import {
  getClassResponseSelector,
  getClassStudentResponseSelector,
  getTestActivitySelector,
  getAdditionalDataSelector,
  getAssignmentClassIdSelector
} from "../../../ClassBoard/ducks";

class PrintPreview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      loadClassStudentResponse,
      match,
      testActivity,
      additionalData,
      history,
      loadClassResponses,
      selectedStudents
    } = this.props;
    if (testActivity.length === 0) {
      history.goBack();
    }

    const { testId, classId } = additionalData;
    let selectedStudentIds = Object.keys(selectedStudents);
    let selectedActivities = [];
    for (let i = 0; i < selectedStudentIds.length; i++) {
      testActivity.map(student => {
        if (student.studentId === selectedStudentIds[i]) {
          if (student.testActivityId) selectedActivities.push(student.testActivityId);
        }
      });
    }

    loadClassStudentResponse({ selectedActivities, groupId: classId });
    loadClassResponses({ testId });
  }

  render() {
    const { testActivity, classResponse, classStudentResponse, additionalData } = this.props;
    const testName = additionalData ? additionalData.testName : "";
    const { assignmentIdClassId } = this.props;

    const nDueDate = additionalData ? additionalData.endDate : "";
    const dueDate = moment(nDueDate).format("MMMM DD, YYYY | hh:mm A");

    let renderClassStudentsResponse = [];
    if (classStudentResponse && Object.keys(classStudentResponse).length > 0) {
      classStudentResponse.map(studentResponse => {
        const renderStudentResponse = (
          <StudentQuestionContainer
            testActivity={testActivity}
            classResponse={classResponse}
            additionalData={additionalData}
            studentResponse={studentResponse}
            assignmentIdClassId={assignmentIdClassId}
          />
        );
        renderClassStudentsResponse.push(renderStudentResponse);
      });
    }

    return (
      <PrintPreviewBack>
        <PrintPreviewContainer>
          <StyledTitle>
            <b>
              <Color>Edu</Color>
            </b>
            lastic
          </StyledTitle>
          <PagePrinterHeader>
            <TestInfo>
              <InfoItem>
                <Color>TestName : </Color>
                {testName}
              </InfoItem>
              <InfoItem>
                <Color>Due : </Color>
                {dueDate}
              </InfoItem>
            </TestInfo>
          </PagePrinterHeader>
          {renderClassStudentsResponse}
        </PrintPreviewContainer>
      </PrintPreviewBack>
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      classResponse: getClassResponseSelector(state),
      classStudentResponse: getClassStudentResponseSelector(state),
      testActivity: getTestActivitySelector(state),
      additionalData: getAdditionalDataSelector(state),
      assignmentIdClassId: getAssignmentClassIdSelector(state),
      selectedStudents: get(state, ["author_classboard_gradebook", "selectedStudents"], {})
    }),
    {
      loadClassStudentResponse: receiveClassStudentResponseAction,
      loadClassResponses: receiveClassResponseAction
    }
  )
);

export default enhance(PrintPreview);

/* eslint-disable react/require-default-props */
PrintPreview.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  classResponse: PropTypes.object,
  classStudentResponse: PropTypes.object,
  testActivity: PropTypes.array,
  additionalData: PropTypes.object,
  loadClassStudentResponse: PropTypes.func,
  creating: PropTypes.object,
  assignmentIdClassId: PropTypes.object,
  loadClassResponses: PropTypes.func
};
