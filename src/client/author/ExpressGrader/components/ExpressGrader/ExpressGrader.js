import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// actions
import {
  receiveGradeBookdAction,
  receiveClassResponseAction,
  receiveTestActivitydAction,
  receiveStudentResponseAction
} from "../../../src/actions/classBoard";
// ducks
import {
  getGradeBookSelector,
  getTestActivitySelector,
  getAdditionalDataSelector,
  getClassResponseSelector,
  getStudentResponseSelector
} from "../../../ClassBoard/ducks";
// components
import ScoreTable from "../ScoreTable/ScoreTable";
import QuestionModal from "../QuestionModal/QuestionModal";
import ClassHeader from "../../../Shared/Components/ClassHeader/ClassHeader";
// styled wrappers
import { PaginationInfo, StyledFlexContainer } from "./styled";

class ExpressGrader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: null,
      tableData: null,
      isVisibleModal: false
    };
  }

  componentDidMount() {
    const { loadGradebook, loadTestActivity, loadStudentResponses, match } = this.props;
    const { assignmentId, classId, testActivityId } = match.params;
    loadGradebook(assignmentId, classId);
    loadTestActivity(assignmentId, classId);
    loadStudentResponses({ testActivityId, groupId: classId });
  }

  static getDerivedStateFromProps(props, state) {
    const { loadClassResponses, additionalData: { testId } = {} } = props;
    if (testId !== state.testId) {
      loadClassResponses({ testId });
      return { testId };
    }
    return null;
  }

  handleCreate = () => {
    // eslint-disable-next-line react/prop-types
    const { history, match } = this.props;
    history.push(`${match.url}/create`);
  };

  showQuestionModal = (record, tableData) => {
    this.setState({
      record,
      tableData,
      isVisibleModal: true
    });
  };

  hideQuestionModal = () => {
    this.setState({
      isVisibleModal: false,
      record: null
    });
  };

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      creating,
      testActivity,
      studentResponse,
      additionalData,
      match
    } = this.props;
    const { isVisibleModal, record, tableData } = this.state;
    const { assignmentId, classId } = match.params;
    const questionActivities = studentResponse !== undefined ? studentResponse.questionActivities : [];
    return (
      <div>
        <ClassHeader
          classId={classId}
          creating={creating}
          active="expressgrader"
          assignmentId={assignmentId}
          onCreate={this.handleCreate}
          additionalData={additionalData || {}}
        />
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            &lt; <Link to="/author/assignments">RECENTS ASSIGNMENTS</Link> /{" "}
            {additionalData && <a>{additionalData.testName}</a>} / {additionalData && <a>{additionalData.className}</a>}
          </PaginationInfo>
        </StyledFlexContainer>
        <ScoreTable
          testActivity={testActivity}
          questionActivities={questionActivities}
          showQuestionModal={this.showQuestionModal}
        />
        {isVisibleModal && (
          <QuestionModal
            record={record}
            tableData={tableData}
            isVisibleModal={isVisibleModal}
            showQuestionModal={this.showQuestionModal}
            hideQuestionModal={this.hideQuestionModal}
          />
        )}
      </div>
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      gradebook: getGradeBookSelector(state),
      testActivity: getTestActivitySelector(state),
      additionalData: getAdditionalDataSelector(state),
      classResponse: getClassResponseSelector(state),
      studentResponse: getStudentResponseSelector(state)
    }),
    {
      loadGradebook: receiveGradeBookdAction,
      loadTestActivity: receiveTestActivitydAction,
      loadClassResponses: receiveClassResponseAction,
      loadStudentResponses: receiveStudentResponseAction
    }
  )
);

export default enhance(ExpressGrader);

/* eslint-disable react/require-default-props */
ExpressGrader.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  testActivity: PropTypes.object,
  additionalData: PropTypes.object,
  studentResponse: PropTypes.object,
  loadGradebook: PropTypes.func,
  loadTestActivity: PropTypes.func,
  loadStudentResponses: PropTypes.func
};
