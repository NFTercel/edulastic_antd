import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { get } from "lodash";
import StudentQuestionContainer from "../StudentQuestionContiner/StudentQuestionContainer";
const html2canvas = require("html2canvas");
import jsPDF from "jspdf";

import { PrintPreviewBack, PrintPreviewContainer, StyledTitle, Color } from "./styled";

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

const PRINT_PAGE_WIDTH = 210;
const PRINT_PAGE_HEIGHT = 295;

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

    // setTimeout(() => {
    //   const textAreas = ReactDOM.findDOMNode(this.printpreviewRef).getElementsByTagName("textarea");
    //   for (let i = 0; i < textAreas.length; i++) {
    //     let value = textAreas[i].value;
    //     let parent = textAreas[i].parentNode;
    //     $(parent).append("<div>" + value + "</div>");
    //   }

    //   let printPreviewInput = ReactDOM.findDOMNode(this.printpreviewRef);
    //   html2canvas(printPreviewInput).then(canvas => {
    //     const imgData = canvas.toDataURL("image/jpeg");

    //     let imgWidth = 210;
    //     let pageHeight = 295;
    //     let imgHeight = (canvas.height * imgWidth) / canvas.width;
    //     let heightLeft = imgHeight;

    //     let doc = new jsPDF();
    //     let position = 0;
    //     doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    //     heightLeft -= pageHeight;

    //     while (heightLeft >= 0) {
    //       position = heightLeft - imgHeight;
    //       doc.addPage();
    //       doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    //       heightLeft -= pageHeight;
    //     }

    //     doc.save(testId + ".pdf");
    //   });
    // }, 5000);
  }

  render() {
    const { testActivity, classResponse, classStudentResponse, additionalData } = this.props;

    // const testActivity = classStudentResponse ? classStudentResponse.testActivity : null;
    // const questionActivities = classStudentResponse ? classStudentResponse.questionActivities : null;
    // const showClassQuestions = !!testActivity;

    // if (questionActivities) {
    //   questionActivities.forEach((item, i) => {
    //     totalScore += item.score || 0;
    //     totalMaxScore += item.maxScore || 1;
    //     data.push({
    //       id: item._id,
    //       name: `Q${i + 1}`,
    //       red: (item.maxScore || 1) - (item.score || 0),
    //       green: item.score || 0,
    //       all: item.maxScore || 1
    //     });
    //   });
    // }

    // let assignmentId = testActivity ? testActivity.assignmentId : "";
    // let groupId = testActivity ? testActivity.groupId : "";
    // const testActivityId = testActivity ? testActivity._id : "";
    // const userId = testActivity ? testActivity.userId : "";
    // const classassignment = classResponse ? classResponse.title : "";
    // const classname = additionalData ? additionalData.className : "";
    // const classnames = [{ name: classname }];
    // const currentStudent = studentItems.find(({ studentId }) => studentId === userId);
    // const studentName = currentStudent ? currentStudent.studentName : "";
    const { assignmentIdClassId } = this.props;

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
          {renderClassStudentsResponse}
          {/* <StyledTitle>Edulastic</StyledTitle>
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

          {showClassQuestions && (
            <StudentQuestions
              currentStudent={currentStudent || []}
              questionActivities={studentResponse.questionActivities}
              classResponse={classResponse}
            />
          )} */}
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
