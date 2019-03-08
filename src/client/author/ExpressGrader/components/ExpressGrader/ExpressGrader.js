/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
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
  getAdditionalDataSelector
} from "../../../Shared/Ducks/classBoard";
// selectors
import { getClassResponseSelector, getStudentResponseSelector } from "../../../src/selectors/classBoard";
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
    this.showQuestionModal = this.showQuestionModal.bind(this);
    this.hideQuestionModal = this.hideQuestionModal.bind(this);
  }

  componentDidMount() {
    const { loadGradebook, loadTestActivity, loadStudentResponses, match } = this.props;
    const { assignmentId, classId, testActivityId } = match.params;
    loadGradebook(assignmentId, classId);
    loadTestActivity(assignmentId, classId);
    loadStudentResponses({ testActivityId });
  }

  handleCreate = () => {
    // eslint-disable-next-line react/prop-types
    const { history, match } = this.props;
    history.push(`${match.url}/create`);
  };

  showQuestionModal(record, tableData) {
    this.setState({
      record,
      tableData,
      isVisibleModal: true
    });
  }

  hideQuestionModal() {
    this.setState({
      isVisibleModal: false,
      record: null
    });
  }

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      creating,
      testActivity,
      studentResponse,
      additionalData
    } = this.props;
    const { isVisibleModal, record, tableData } = this.state;
    const { assignmentId, classId } = this.props.match.params;
    const questionActivities = studentResponse !== undefined ? studentResponse.questionActivities : [];

    return (
      <div>
        <ClassHeader
          classId={classId}
          creating={creating}
          active="expressgrader"
          assignmentId={assignmentId}
          onCreate={this.handleCreate}
        />
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            <a>
              &lt; <Link to="/author/assignments">RECENTS ASSIGNMENTS</Link>
            </a>{" "}
            / <a>CALIFORNIA VERSION 4</a> / <a>CLASS 1</a>
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

ExpressGrader.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  count: PropTypes.number.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  windowWidth: PropTypes.number.isRequired,
  testActivity: PropTypes.object.isRequired
};
