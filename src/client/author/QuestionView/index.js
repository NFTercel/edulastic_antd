import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Bar, ComposedChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { StyledCard } from "./styled";
import StudentResponse from "./component/studentResponses/studentResponse";
import ClassQuestions from "../ClassResponses/components/Container/ClassQuestions";

// actions
import { receiveAnswersAction } from "../src/actions/classBoard";
// selectors
import { getAssignmentClassIdSelector, getClassQuestionSelector } from "../ClassBoard/ducks";

class QuestionViewContainer extends Component {
  componentDidMount() {
    const { loadClassQuestionResponses, assignmentIdClassId: { assignmentId, classId } = {}, question } = this.props;
    loadClassQuestionResponses(assignmentId, classId, question.id);
  }

  render() {
    const {
      testActivity,
      classResponse: { testItems, ...others },
      question,
      classQuestion
    } = this.props;
    const filterdItems = testItems.filter(item => item.data.questions.filter(q => q.id === question.id).length > 0);
    filterdItems.forEach(item => {
      item.data.questions = item.data.questions.filter(({ id }) => id === question.id);
      item.rows = item.rows.map(row => ({
        ...row,
        widgets: row.widgets.filter(({ reference }) => reference === question.id)
      }));
    });
    const data = [];
    if (testActivity.length > 0) {
      testActivity.map(student => {
        if (student.status === "submitted") {
          data.push({
            name: student.studentName,
            score: student.score ? student.score : 0,
            time: 0,
            maxscore: student.maxScore
          });
        }
        return "";
      });
    }
    return (
      <React.Fragment>
        <StyledCard bordered={false} width="100%">
          <ComposedChart barGap={1} barSize={36} data={data} width={1200} height={250}>
            <XAxis dataKey="name" axisLine={false} tickSize={0} />
            <YAxis
              dataKey="score"
              yAxisId={0}
              tickCount={4}
              allowDecimals={false}
              tick={{ strokeWidth: 0, fill: "#999" }}
              tickSize={6}
              label={{ value: "PERFORMANCE", angle: -90, fill: "#999" }}
              stroke="#999"
            />
            <YAxis
              dataKey="time"
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
            <Bar stackId="a" dataKey="score" fill="#1fe3a0" onClick={this.onClickChart} />
            <Bar stackId="a" dataKey="time" fill="#ee1b82" onClick={this.onClickChart} />
          </ComposedChart>
        </StyledCard>
        <StudentResponse testActivity={testActivity} />
        {testActivity &&
          testActivity.map(student => {
            if (!student.testActivityId || classQuestion.length === 0) {
              return null;
            }
            return (
              <ClassQuestions
                currentStudent={student}
                classResponse={{ testItems: filterdItems, ...others }}
                questionActivities={classQuestion.filter(({ userId }) => userId === student.studentId)}
              />
            );
          })}
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
export default enhance(QuestionViewContainer);

QuestionViewContainer.propTypes = {
  classResponse: PropTypes.object.isRequired,
  assignmentIdClassId: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  testActivity: PropTypes.array.isRequired,
  classQuestion: PropTypes.array,
  loadClassQuestionResponses: PropTypes.func
};
QuestionViewContainer.defaultProps = {
  classQuestion: [],
  loadClassQuestionResponses: () => {}
};
