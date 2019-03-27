import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import StudentQuestions from "../StudentQuestions/StudentQuestions";
import Page from "../Page/Page";
const html2canvas = require("html2canvas");
import jsPDF from "jspdf";

import {
  PrintContainer,
  Container,
  StyledTitle,
  StudentInformation,
  InfoItem,
  StudentQuestionHeader,
  TimeContainer,
  Color,
  TimeItem,
  ScoreContainer,
  ScoreLabel,
  TotalScore,
  FractionLine
} from "./styled";

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

const PRINT_PAGE_WIDTH = 210;
const PRINT_PAGE_HEIGHT = 295;

class PrintPreview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loadStudentResponses, match, testActivity, additionalData, history, loadClassResponses } = this.props;
    if (testActivity.length === 0) {
      history.goBack();
    }
    const { testId, classId } = additionalData;
    const { testActivityId } = match.params;
    loadStudentResponses({ testActivityId, groupId: classId });
    loadClassResponses({ testId });
    setTimeout(() => {
      // const textAreas = (ReactDOM.findDOMNode(this.printpreviewRef)).getElementsByTagName('textarea');
      // for(let i=0; i< textAreas.length; i++){
      //   let value = textAreas[i].value;
      //   let className = textAreas[i].className + " textarea-div";
      //   textAreas[i].replaceWith("<div class='" + className + "'>"+value+"</div>")
      // }

      let printPreviewInput = ReactDOM.findDOMNode(this.printpreviewRef);
      html2canvas(printPreviewInput).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        let imgWidth = 210;
        let pageHeight = 295;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let doc = new jsPDF("p", "mm");
        let position = 0;

        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save(testId + ".pdf");
      });
    }, 5000);
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
      <PrintContainer>
        <Container
          ref={ref => {
            this.printpreviewRef = ref;
          }}
        >
          <StyledTitle>Edulastic</StyledTitle>
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
          )}
        </Container>
        <div
          ref={ref => {
            this.testRef = ref;
          }}
        />
      </PrintContainer>
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

export default enhance(PrintPreview);

/* eslint-disable react/require-default-props */
PrintPreview.propTypes = {
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
