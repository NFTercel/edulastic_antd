import React, { Component } from "react";
import { Card } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";

import HooksContainer from "../../../author/ClassBoard/components/HooksContainer/HooksContainer";
import ClassHeader from "../../Shared/Components/ClassHeader/ClassHeader";

import TableDisplay from "../../StandardsBasedReport/components/TableDisplay";
import { getReceivedBasedReportsAction } from "../actions/standardBasedReport";

class StandardsBasedReport extends Component {
  componentDidMount() {
    const {
      getStandardBasedPerformance,
      match: {
        params: { assignmentId, classId }
      }
    } = this.props;
    getStandardBasedPerformance(assignmentId, classId);
  }

  render() {
    const {
      standardReportsReducer: { entities } = {},
      match: {
        params: { assignmentId, classId }
      }
    } = this.props;

    if (!entities) {
      return <div />;
    }

    return (
      <React.Fragment>
        <ClassHeader classId={classId} active="classboard" assignmentId={assignmentId} />
        <HooksContainer classId={classId} assignmentId={assignmentId} />
        <Card>
          <h3>Standards performance</h3>
          <TableDisplay standardReportData={entities} />
        </Card>
      </React.Fragment>
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      standardReportsReducer: state.standardReports.data
    }),
    {
      getStandardBasedPerformance: getReceivedBasedReportsAction
    }
  )
);

export default enhance(StandardsBasedReport);
