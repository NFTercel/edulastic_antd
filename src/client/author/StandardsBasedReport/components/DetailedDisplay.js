import React, { Component } from "react";
import { Icon } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";

import { getTestActivitySelector, getAdditionalDataSelector } from "../../ClassBoard/ducks";
import {
  DetailCard,
  DetailCardHeader,
  DetailCardTitle,
  DetailCardSubTitle,
  DetailCardDesc,
  DetailTable,
  StudnetCell,
  PerformanceScore,
  PerformancePercent,
  MasteryCell
} from "./styled";

const columns = [
  {
    title: "Student",
    dataIndex: "student",
    key: "student",
    sorter: (a, b) => a.age - b.age,
    render: text => <StudnetCell>{text}</StudnetCell>
  },
  {
    title: "Mastery",
    dataIndex: "mastery",
    key: "mastery",
    sorter: (a, b) => a.age - b.age,
    render: mastery => (
      <MasteryCell>
        <span style={{ color: mastery.color }}>
          {mastery.masteryLabel}
          <Icon type={mastery.icon || "caret-up"} />
        </span>
      </MasteryCell>
    )
  },
  {
    title: "Performance",
    dataIndex: "performance",
    sorter: (a, b) => a.age - b.age,
    key: "performance",
    render: text => {
      const strArr = text.split("@");
      return (
        <div style={{ textAlign: "center" }}>
          <PerformanceScore>{strArr[0]}</PerformanceScore>
          <PerformancePercent>{strArr[1]}</PerformancePercent>
        </div>
      );
    }
  }
];

class DetailedDisplay extends Component {
  filterData = () => {
    const { testActivity, data } = this.props;
    const studentData = testActivity.filter(std =>
      std.questionActivities.filter(
        questionActivity => data.qIds.filter(qId => questionActivity._id === qId).length > 0
      )
    );
    return studentData;
  };

  displayData = () => {
    const { additionalData } = this.props;
    const filteredData = this.filterData();
    const assignmentMasteryArray = additionalData.assignmentMastery;
    assignmentMasteryArray.sort((a, b) => b.threshold - a.threshold);

    return filteredData.map((std, index) => {
      const score = std.score ? std.score : 0;
      const perfomancePercentage = parseFloat(((score / std.maxScore) * 100).toFixed(0));

      // TODO need to update `mastery'
      let mastery = {
        color: "#E61E54",
        masteryLabel: "NM",
        icon: "caret-down"
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
        performance: `${std.score ? std.score : 0}/${std.maxScore}@(${perfomancePercentage}%)`
      };
    });
  };

  render() {
    const { data, onClose } = this.props;
    return (
      <React.Fragment>
        <DetailCard>
          <DetailCardHeader>
            <DetailCardTitle>
              Student Performance
              <Icon type="close" onClick={onClose} />
            </DetailCardTitle>
            <DetailCardSubTitle>Standard: 2.LS2.1</DetailCardSubTitle>
            <DetailCardDesc>{data.desc}</DetailCardDesc>
          </DetailCardHeader>
          <DetailTable columns={columns} dataSource={this.displayData()} pagination={false} />
        </DetailCard>
      </React.Fragment>
    );
  }
}

const enhance = compose(
  connect(state => ({
    testActivity: getTestActivitySelector(state),
    additionalData: getAdditionalDataSelector(state)
  }))
);

export default enhance(DetailedDisplay);
DetailedDisplay.propTypes = {
  data: PropTypes.object.isRequired,
  /* eslint-disable react/require-default-props */
  onClose: PropTypes.func,
  additionalData: PropTypes.object,
  testActivity: PropTypes.array
};
