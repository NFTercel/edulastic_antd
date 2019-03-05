import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { withWindowSizes } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import TestItemPreview from "../../../../assessment/components/TestItemPreview";

import { getRows } from "../../../sharedSelectors/itemDetail";
import { getClassResponseSelector, getStudentResponseSelector } from "../../../sharedSelectors/classBoard";
import { receiveClassResponseAction, receiveTestActivitydAction } from "../../../src/actions/classBoard";

import { Content } from "./styled";
import { keyBy as _keyBy } from "lodash";

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
          questions={questionsKeyed}
          preview="show"
          previewTab="show"
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
