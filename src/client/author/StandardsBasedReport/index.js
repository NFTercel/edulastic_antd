import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import HooksContainer from "../ClassBoard/components/HooksContainer/HooksContainer";
import ClassHeader from "../Shared/Components/ClassHeader/ClassHeader";

import TableDisplay from "./components/TableDisplay";
import { receiveTestActivitydAction } from "../src/actions/classBoard";
import { getTestActivitySelector, getAdditionalDataSelector } from "../ClassBoard/ducks";
import { Anchor, AnchorLink, PaginationInfo, StyledFlexContainer, DivWrapper } from "./components/styled";

class StandardsBasedReport extends Component {
  componentDidMount() {
    const { loadTestActivity, match } = this.props;
    const { assignmentId, classId } = match.params;
    loadTestActivity(assignmentId, classId);
  }

  getTestActivity = data => {
    let id = null;
    data.forEach(item => {
      if (item.testActivityId) {
        id = item.testActivityId;
      }
    });
    return id;
  };

  render() {
    const {
      testActivity,
      additionalData,
      creating,
      match: {
        params: { assignmentId, classId }
      }
    } = this.props;
    const testActivityId = this.getTestActivity(testActivity);
    return (
      <React.Fragment>
        <ClassHeader
          classId={classId}
          active="standard_report"
          creating={creating}
          assignmentId={assignmentId}
          additionalData={additionalData || {}}
          testActivityId={testActivityId}
        />
        <HooksContainer classId={classId} assignmentId={assignmentId} />

        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            &lt; <AnchorLink to="/author/assignments">RECENTS ASSIGNMENTS</AnchorLink> /{" "}
            <Anchor>{additionalData.testName}</Anchor> / <Anchor>{additionalData.className}</Anchor>
          </PaginationInfo>
        </StyledFlexContainer>

        <DivWrapper>
          <TableDisplay testActivity={testActivity} />
        </DivWrapper>
      </React.Fragment>
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      testActivity: getTestActivitySelector(state),
      additionalData: getAdditionalDataSelector(state)
    }),
    {
      loadTestActivity: receiveTestActivitydAction
    }
  )
);

export default enhance(StandardsBasedReport);

StandardsBasedReport.propTypes = {
  /* eslint-disable react/require-default-props */
  match: PropTypes.object,
  testActivity: PropTypes.array,
  additionalData: PropTypes.object,
  loadTestActivity: PropTypes.func,
  creating: PropTypes.object
};

StandardsBasedReport.defaultProps = {
  additionalData: {}
};
