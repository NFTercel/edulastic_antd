import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withWindowSizes } from "@edulastic/common";
import { Link } from "react-router-dom";
import { withNamespaces } from "@edulastic/localization";
import { ComposedChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
// components
import ClassSelect from "../../../Shared/Components/ClassSelect/ClassSelect";
import ClassHeader from "../../../Shared/Components/ClassHeader/ClassHeader";
import StudentSelect from "../../../Shared/Components/StudentSelect/StudentSelect";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import ClassQuestions from "./ClassQuestions";
// styled wrappers
import {
  PaginationInfo,
  TimeContainer,
  Color,
  TimeItem,
  ScoreContainer,
  ScoreLabel,
  TotalScore,
  FractionLine,
  PaginationButtonGroup,
  GraphInfo,
  GraphContainer,
  StyledFlexContainer,
  StyledCard,
  FeedbackButton,
  OverallButton,
  SelectWrapper,
  FeedbackActiveButton
} from "./styled";

class ClassResponses extends Component {
  state = {
    showFeedbackForm: false
  };

  componentDidMount() {
    const { loadStudentResponses, match, testActivity, additionalData, history, loadClassResponses } = this.props;
    if (testActivity.length === 0) {
      history.goBack();
    }
    const { testId, classId } = additionalData;
    const { testActivityId } = match.params;
    loadStudentResponses({ testActivityId, groupId: classId });
    loadClassResponses({ testId });
  }

  static getDerivedStateFromProps(props, state) {
    const {
      studentResponse: { testActivity }
    } = props;
    if (!testActivity) {
      return null;
    }
    const { testId, classId } = testActivity;
    if (testId !== state.testId) {
      return { testId, groupId: classId };
    }
    return null;
  }

  handleCreate = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/create`);
  };

  onClickChart = ({ name, id }) => {
    console.log(name, id);
  };

  toggleFeedback = () => {
    const { showFeedbackForm } = this.state;
    this.setState({
      showFeedbackForm: !showFeedbackForm
    });
  };

  render() {
    let totalScore = 0;
    let totalMaxScore = 0;
    const data = [];
    const { showFeedbackForm } = this.state;
    const { testActivity: studentItems } = this.props;
    const { classResponse, additionalData, studentResponse, loadStudentResponses, creating } = this.props;
    const testActivity = studentResponse ? studentResponse.testActivity : null;
    const questionActivities = studentResponse ? studentResponse.questionActivities : null;
    const showClassQuestions = !!testActivity && !showFeedbackForm;

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
    const currentStudent = studentItems.find(student => student.studentId === userId);
    const studentName = currentStudent ? currentStudent.studentName : "";
    const linkToClass = `/author/classboard/${assignmentId}/${groupId}`;
    const linkToResponses = `/author/classresponses/${testActivityId}`;
    const { assignmentIdClassId } = this.props;
    assignmentId = assignmentId || assignmentIdClassId.assignmentId;
    groupId = groupId || assignmentIdClassId.classId;
    return (
      <div>
        <ClassHeader
          classId={groupId}
          active="classboard"
          creating={creating}
          onCreate={this.handleCreate}
          assignmentId={assignmentId}
          additionalData={additionalData}
          testActivityId={testActivityId}
        />
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            <a>
              &lt; <Link to="/author/assignments">RECENTS ASSIGNMENTS</Link>
            </a>{" "}
            /
            <a>
              <Link to="/author/assignments">{classassignment}</Link>
            </a>{" "}
            /
            <a>
              <Link to={linkToClass}>{classname}</Link>
            </a>{" "}
            /
            <a>
              <Link to={linkToResponses}>{studentName}</Link>
            </a>
          </PaginationInfo>
          <SelectWrapper>
            <StudentSelect students={studentItems} loadStudentResponses={loadStudentResponses} />
            <ClassSelect classname={classnames} />
          </SelectWrapper>
        </StyledFlexContainer>
        <StyledCard bordered={false}>
          <GraphContainer>
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart barGap={1} barSize={36} data={data} margin={{ top: 20, right: 60, bottom: 0, left: 20 }}>
                <XAxis dataKey="name" axisLine={false} tickSize={0} />
                <YAxis
                  dataKey="all"
                  yAxisId={0}
                  tickCount={4}
                  allowDecimals={false}
                  tick={{ strokeWidth: 0, fill: "#999" }}
                  tickSize={6}
                  label={{ value: "ATTEMPTS", angle: -90, fill: "#999" }}
                  stroke="#999"
                />
                <YAxis
                  dataKey="all"
                  yAxisId={1}
                  tickCount={4}
                  allowDecimals={false}
                  tick={{ strokeWidth: 0, fill: "#999" }}
                  tickSize={6}
                  label={{
                    value: "AVG TIME (SECONDS)",
                    angle: -90,
                    fill: "#999"
                  }}
                  orientation="right"
                  stroke="#999"
                />
                <Bar stackId="a" dataKey="green" fill="#1fe3a0" onClick={this.onClickChart} />
                <Bar stackId="a" dataKey="red" fill="#ee1b82" onClick={this.onClickChart} />
              </ComposedChart>
            </ResponsiveContainer>
          </GraphContainer>
          <GraphInfo>
            <ScoreContainer>
              <ScoreLabel>TOTAL SCORE</ScoreLabel>
              <TotalScore>{totalScore}</TotalScore>
              <FractionLine />
              <TotalScore>{totalMaxScore}</TotalScore>
            </ScoreContainer>
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
          </GraphInfo>
        </StyledCard>
        <StyledFlexContainer justifyContent="space-between">
          <PaginationButtonGroup>
            <FeedbackActiveButton>6 ALL</FeedbackActiveButton>
            <FeedbackButton>6 NOT STARTED</FeedbackButton>
            <FeedbackButton>0 IN PROGRESS</FeedbackButton>
            <FeedbackButton>0 SUBMITTED</FeedbackButton>
            <FeedbackButton>0 GRADED</FeedbackButton>
          </PaginationButtonGroup>
          <PaginationButtonGroup>
            <OverallButton type="primary" onClick={this.toggleFeedback}>
              GIVE OVERALL FEEDBACK
            </OverallButton>
          </PaginationButtonGroup>
        </StyledFlexContainer>
        {showClassQuestions && !!studentResponse && (
          <ClassQuestions
            currentStudent={currentStudent || []}
            studentResponse={studentResponse}
            classResponse={classResponse}
          />
        )}
        {showFeedbackForm && (
          <StyledFlexContainer justifyContent="flex-end">
            <FeedbackForm />
          </StyledFlexContainer>
        )}
      </div>
    );
  }
}

const enhance = compose(
  withWindowSizes,
  withNamespaces("header"),
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

export default enhance(ClassResponses);

/* eslint-disable react/require-default-props */
ClassResponses.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  classResponse: PropTypes.object,
  studentResponse: PropTypes.object,
  testActivity: PropTypes.array,
  additionalData: PropTypes.object,
  loadStudentResponses: PropTypes.func,
  creating: PropTypes.object,
  loadClassResponses: PropTypes.func
};
