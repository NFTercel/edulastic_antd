import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { receiveStudentResponseAction } from "../../../src/actions/classBoard";
import {
  getStudentResponseSelector,
  getClassResponseSelector,
  getAdditionalDataSelector
} from "../../../ClassBoard/ducks";
import ClassQuestions from "../../../ClassResponses/components/Container/ClassQuestions";

class Question extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { record, loadStudentResponses, additionalData } = this.props;
    const { testActivityId } = record;
    const { classId } = additionalData;

    if (testActivityId) {
      loadStudentResponses({ testActivityId, groupId: classId });
    }
  }

  render() {
    let isEmpty = true;
    const { studentResponse, classResponse, record } = this.props;
    const currentStudent = {
      studentName: ""
    };
    if (studentResponse) {
      isEmpty = !Object.keys(studentResponse).length;
    }
    const { testItems = [], ...others } = classResponse;
    const selectedItems = testItems.filter(
      ({ data: { questions = [] } = {} }) => questions.filter(({ id }) => id === record._id).length > 0
    );
    return (
      <Fragment>
        {!isEmpty && (
          <ClassQuestions
            currentStudent={currentStudent}
            studentResponse={studentResponse}
            classResponse={{ testItems: selectedItems, ...others }}
          />
        )}
      </Fragment>
    );
  }
}

const enhance = compose(
  connect(
    state => ({
      studentResponse: getStudentResponseSelector(state),
      classResponse: getClassResponseSelector(state),
      additionalData: getAdditionalDataSelector(state)
    }),
    {
      loadStudentResponses: receiveStudentResponseAction
    }
  )
);

Question.propTypes = {
  studentResponse: PropTypes.object.isRequired,
  classResponse: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  loadStudentResponses: PropTypes.func.isRequired
};

export default enhance(Question);
