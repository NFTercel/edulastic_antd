import React, { Component } from "react";
import PropTypes from "prop-types";
import { Bar, ComposedChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { StyledCard } from "./styled";
import StudentResponse from "./component/studentResponses/studentResponse";
import ClassQuestions from "../ClassResponses/components/Container/ClassQuestions";

class QuestionViewContainer extends Component {
  render() {
    const { testActivity, classResponse } = this.props;
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
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart barGap={1} barSize={36} data={data} margin={{ top: 20, right: 60, bottom: 0, left: 20 }}>
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
          </ResponsiveContainer>
        </StyledCard>
        <StudentResponse testActivity={testActivity} />
        {testActivity &&
          testActivity.map(student => {
            if (!student.testActivityId) {
              return null;
            }
            const { testItems, ...others } = classResponse;
            return (
              <ClassQuestions currentStudent={student || []} classResponse={{ testItems: [testItems[1]], ...others }} />
            );
          })}
      </React.Fragment>
    );
  }
}

export default QuestionViewContainer;

QuestionViewContainer.propTypes = {
  classResponse: PropTypes.object.isRequired,
  testActivity: PropTypes.object.isRequired
};
