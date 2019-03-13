import React, { Component } from "react";
import { Card, Table, Icon } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { getReceivedBasedReportsAction } from "../../src/actions/standardBasedReport";

const columns = [
  {
    title: "Student",
    dataIndex: "student",
    key: "student"
  },
  {
    title: "Mastery",
    dataIndex: "mastery",
    key: "mastery",
    render: mastery => (
      <span style={{ color: mastery.color }}>
        {mastery.masteryLabel}
        <Icon type="caret-down" />
      </span>
    )
  },
  {
    title: "Performance",
    dataIndex: "performance",
    key: "performance"
  }
];

class DetailedDisplay extends Component {
  filterData = () => {
    const { standardReportsReducer: { entities } = {}, data } = this.props;
    const studentData = entities.result.filter(std => std.questionActivities.filter(questionActivity => data.qIds.filter(qId => questionActivity._id === qId).length > 0));
    return studentData;
  };

  displayData = () => {
    const { standardReportsReducer: { entities } = {} } = this.props;
    const filteredData = this.filterData();
    const assignmentMasteryArray = entities.additionalData.assignmentMastery;
    assignmentMasteryArray.sort((a, b) => b.threshold - a.threshold);

    return filteredData.map((std, index) => {
      const score = std.score ? std.score : 0;
      const perfomancePercentage = ((score / std.maxScore) * 100).toFixed(0);

      let mastery = {
        color: "#fde2b3",
        masteryLabel: "NM"
      };
      for (let i = 0; i < assignmentMasteryArray.length; i++) {
        if (perfomancePercentage > assignmentMasteryArray[i].threshold) {
          mastery = assignmentMasteryArray[i];
          break;
        }
      }

      return {
        key: index + 1,
        student: std.studentName,
        mastery,
        performance: `${std.score ? std.score : 0}/${std.maxScore}(${perfomancePercentage}%)`
      };
    });
  };

  render() {
    const { data } = this.props
    return (
      <React.Fragment>
        <Card title="Student Performance">
          <h5>Demo</h5>
          <p>
            {data.desc}
          </p>
          <Table columns={columns} dataSource={this.displayData()} pagination={false} />
        </Card>
      </React.Fragment>
    );
  }
}

const enhance = compose(
  connect(state => ({
    standardReportsReducer: state.standardReports.data
  }))
);

export default enhance(DetailedDisplay);
