import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { keyBy as _keyBy } from "lodash";
import { withWindowSizes } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
// actions
import { receiveClassResponseAction, receiveTestActivitydAction } from "../../../src/actions/classBoard";
// selectors
import { getClassResponseSelector, getStudentResponseSelector } from "../../../Shared/Selectors/classBoard";
// components
import TestItemPreview from "../../../../assessment/components/TestItemPreview";
import { getRows } from "../../../Shared/Selectors/itemDetail";
// styled wrappers
import { Content } from "./styled";

class ClassQuestions extends Component {
  componentDidMount() {
    const { studentResponse } = this.props;
    const {
      testActivity: { assignmentId, groupId: classId, testId }
    } = studentResponse;
    if (!classId) {
      return;
    }
    const { loadClassResponses, loadTestActivity } = this.props;
    loadTestActivity(assignmentId, classId);
    loadClassResponses({ testId });
  }

  getTestItems() {
    const {
      showOnly = null,
      currentStudent,
      classResponse: { testItems },
      studentResponse: { questionActivities }
    } = this.props;
    const userQActivities =
      currentStudent && currentStudent.questionActivities ? currentStudent.questionActivities : [];

    if (!testItems || !questionActivities) {
      return [];
    }

    if (showOnly !== null) {
      testItems.forEach(({ rows }) => {
        rows.forEach(row => {
          const filteredWidgets = row.widgets.filter(({ reference }) => reference === showOnly);
          row.widgets = filteredWidgets;
        });
      });
    }

    testItems.forEach(({ data }) => {
      if (!(data && data.questions)) {
        return;
      }
      data.questions.forEach(question => {
        const { id } = question;
        let qIndex = 0;
        let qActivities = questionActivities.filter(({ qid }) => qid === id);
        qActivities.map(q => {
          const userQuestion = userQActivities.find(question => question._id === q.qid);
          if (userQuestion) {
            q.qIndex = ++qIndex;
            q.timespent = userQuestion.timespent;
            q.studentName = currentStudent !== undefined ? currentStudent.studentName : null;
          }
        });
        if (qActivities.length > 0) {
          [question.activity] = qActivities;
        }
      });
    });
    return testItems;
  }

  renderPreview = item => {
    const rows = getRows(item);
    const questions = (item.data && item.data.questions) || [];
    const questionsKeyed = _keyBy(questions, "id");
    return (
      <Content key={item._id}>
        <TestItemPreview
          showFeedback
          cols={rows}
          preview="show"
          previewTab="show"
          questions={questionsKeyed}
          verticalDivider={item.verticalDivider}
          scrolling={item.scrolling}
          style={{ width: "100%" }}
        />
      </Content>
    );
  };

  render() {
    const testItems = this.getTestItems();

    return testItems.map(item => this.renderPreview(item));
  }
}
const enhance = compose(
  withWindowSizes,
  withNamespaces("header"),
  connect(
    state => ({
      classResponse: getClassResponseSelector(state),
      studentResponse: getStudentResponseSelector(state)
    }),
    {
      loadClassResponses: receiveClassResponseAction,
      loadTestActivity: receiveTestActivitydAction
    }
  )
);

export default enhance(ClassQuestions);

ClassQuestions.propTypes = {
  classResponse: PropTypes.shape({}).isRequired,
  studentResponse: PropTypes.shape({}).isRequired,
  testActivity: PropTypes.shape({}).isRequired,
  loadClassResponses: PropTypes.func.isRequired,
  loadTestActivity: PropTypes.func.isRequired
};
