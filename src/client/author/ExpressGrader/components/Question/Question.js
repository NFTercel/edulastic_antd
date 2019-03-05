/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { receiveStudentResponseAction } from "../../../src/actions/classBoard";
import { getStudentResponseSelector } from "../../../src/selectors/classBoard";
import ClassQuestions from "../../../ClassResponses/components/Container/ClassQuestions";

class Question extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { record, loadStudentResponses } = this.props;
    const { testActivityId } = record;

    if (testActivityId) {
      loadStudentResponses({ testActivityId });
    }
  }

  render() {
    const { studentResponse, record } = this.props;
    const questionId = record ? record.id : null;
    let isEmpty = true;
    if (studentResponse) {
      isEmpty = !Object.keys(studentResponse).length;
    }
    return (
      <Fragment>{!isEmpty && <ClassQuestions studentResponse={studentResponse} showOnly={questionId} />}</Fragment>
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      studentResponse: getStudentResponseSelector(state)
    }),
    {
      loadStudentResponses: receiveStudentResponseAction
    }
  )
);

export default enhance(Question);
