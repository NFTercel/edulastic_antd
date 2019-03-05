/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import Score from "../Score/Score";
import SortBar from "../SortBar/SortBar";
import SortClass from "../SortClass/SortClass";
import ListHeader from "../ListHeader/ListHeader";
import QuestionModal from "../QuestionModal/QuestionModal";

import {
  getGradeBookSelector,
  getTestActivitySelector,
  getAdditionalDataSelector
} from "../../../sharedDucks/classBoard";

import {
  receiveGradeBookdAction,
  receiveClassResponseAction,
  receiveTestActivitydAction
} from "../../../src/actions/classBoard";

import { getClassResponseSelector, getStudentResponseSelector } from "../../../src/selectors/classBoard";

import { receiveStudentResponseAction } from "../../../src/actions/classBoard";

import { PaginationInfo, StyledFlexContainer } from "./styled";

class ExpressGrader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: null,
      tableData: null,
      viewType: "view",
      isVisibleModal: false
    };
    this.changeViewType = this.changeViewType.bind(this);
    this.showQuestionModal = this.showQuestionModal.bind(this);
    this.hideQuestionModal = this.hideQuestionModal.bind(this);
  }

  componentDidMount() {
    const { loadGradebook, loadTestActivity, match } = this.props;
    const { assignmentId, classId } = match.params;
    loadGradebook(assignmentId, classId);
    loadTestActivity(assignmentId, classId);
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

  changeViewType(e) {
    this.setState({ viewType: e.target.value });
  }

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      creating,
      testActivity,
      additionalData = {
        classes: []
      }
    } = this.props;
    const { viewType, isVisibleModal, record, tableData } = this.state;
    const { assignmentId, classId } = this.props.match.params;
    const classname = additionalData ? additionalData.className : "";

    return (
      <div>
        <ListHeader onCreate={this.handleCreate} creating={creating} assignmentId={assignmentId} classId={classId} />
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            <a>
              &lt; <Link to="/author/assignments">RECENTS ASSIGNMENTS</Link>
            </a>{" "}
            / <a>CALIFORNIA VERSION 4</a> / <a>CLASS 1</a>
          </PaginationInfo>
          <SortBar viewType={viewType} changeViewType={this.changeViewType} />
          <SortClass classname={classname} />
        </StyledFlexContainer>
        <Score viewType={viewType} testActivity={testActivity} showQuestionModal={this.showQuestionModal} />
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
