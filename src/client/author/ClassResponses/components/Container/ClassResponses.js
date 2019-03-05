import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withWindowSizes } from "@edulastic/common";
import { Link } from "react-router-dom";
import { withNamespaces } from "@edulastic/localization";
import { ComposedChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

import ClassQuestions from "./ClassQuestions";

import { receiveStudentResponseAction } from "../../../src/actions/classBoard";

import {
  getClassResponseSelector,
  getStudentResponseSelector,
  getTestActivitySelector
} from "../../../src/selectors/classBoard";
import {
  getAdditionalDataSelector
} from '../../../sharedDucks/classBoard';

import ListHeader from "../ListHeader/ListHeader";
import SortClass from "../SortClass/SortClass";
import SortStudent from "../SortStudent/SortStudent";
import FeedbackForm from "../FeedbackForm/FeedbackForm";

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
  FeedbackActiveButton
} from "./styled";

class ClassResponses extends Component {
  state = {
    showFeedbackForm: false
  };

  componentDidMount() {
    const { loadStudentResponses, match } = this.props;
    const { testActivityId } = match.params;
    loadStudentResponses({ testActivityId });
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
    const data = [];
    const { showFeedbackForm } = this.state;
    const studentItems = this.props.testActivity;
    const {
      classResponse,
      additionalData,
      loadStudentResponses,
      studentResponse: { questionActivities, testActivity }
    } = this.props;
    const showClassQuestions = testActivity && !showFeedbackForm;
    let totalScore = 0;
    let totalMaxScore = 0;
    if (questionActivities) {
      questionActivities.forEach((item, i) => {
        totalScore += item.score || 0;
        totalMaxScore += item.maxScore || 0;
        data.push({
          id: item._id,
          name: `Q${i + 1}`,
          red: (item.maxScore || 0) - (item.score || 0),
          green: item.score || 0,
          all: item.maxScore || 0
        });
      });
    }

    const assignmentId = testActivity ? testActivity.assignmentId : "";
    const groupId = testActivity ? testActivity.groupId : "";
    const classId = testActivity ? testActivity._id : "";
    const userId = testActivity ? testActivity.userId : "";
    const classassignment = classResponse ? classResponse.title : "";
    const classname = additionalData ? additionalData.className : "";
    const currentStudent = studentItems.find(student => student.studentId === userId);
    const studentName = currentStudent ? currentStudent.studentName : "";
    const linkToClass = `/author/classboard/${assignmentId}/${groupId}`;
    const linkToResponses = `/author/classresponses/${classId}`;

    return (
      <div>
        <ListHeader additionalData={additionalData || {}} onCreate={this.handleCreate} />
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            <a>
              &lt; <Link to="/author/assignments">RECENTS ASSIGNMENTS</Link>
            </a>{" "}
            /
            <a>
              &nbsp; <Link to="/author/assignments">{classassignment}</Link>
            </a>{" "}
            /
            <a>
              &nbsp; <Link to={linkToClass}>{classname}</Link>
            </a>{" "}
            /
            <a>
              &nbsp; <Link to={linkToResponses}>{studentName}</Link>
            </a>
          </PaginationInfo>
          <StyledFlexContainer justifyContent="space-between">
            <SortStudent students={studentItems} loadStudentResponses={loadStudentResponses} />
            <SortClass classname={classname} />
          </StyledFlexContainer>
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
        {showClassQuestions && <ClassQuestions testActivity={testActivity} currentStudent={currentStudent || []} />}
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
      additionalData: getAdditionalDataSelector(state)
    }),
    {
      loadStudentResponses: receiveStudentResponseAction
    }
  )
);

export default enhance(ClassResponses);

ClassResponses.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  classResponse: PropTypes.shape({}).isRequired,
  studentResponse: PropTypes.shape({}).isRequired,
  loadStudentResponses: PropTypes.func.isRequired
};
