import React, { Component } from "react";
import PropTypes from "prop-types";
import { keyBy as _keyBy } from "lodash";
// components
import TestItemPreview from "../../../../assessment/components/TestItemPreview";
import { getRows } from "../../../sharedDucks/itemDetail";
// styled wrappers
import { Content } from "./styled";

function Preview({ item }) {
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
}

Preview.propTypes = {
  item: PropTypes.object.isRequired
};

class ClassQuestions extends Component {
  getTestItems() {
    const {
      currentStudent,
      studentResponse,
      classResponse: { testItems }
    } = this.props;
    const userQActivities =
      currentStudent && currentStudent.questionActivities ? currentStudent.questionActivities : [];
    const questionActivities =
      studentResponse && studentResponse.questionActivities ? studentResponse.questionActivities : [];

    if (!testItems) {
      return [];
    }

    testItems.forEach(({ data }) => {
      if (!(data && data.questions)) {
        return;
      }
      data.questions.forEach(question => {
        const { id } = question;
        let qIndex = 0;
        const qActivities = questionActivities.filter(({ qid }) => qid === id);
        qActivities.forEach(q => {
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

  render() {
    const testItems = this.getTestItems();
    return testItems.map(item => <Preview item={item} />);
  }
}

export default ClassQuestions;

ClassQuestions.propTypes = {
  classResponse: PropTypes.object.isRequired,
  studentResponse: PropTypes.object.isRequired,
  currentStudent: PropTypes.object.isRequired
};
