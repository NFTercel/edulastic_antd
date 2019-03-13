import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { receiveStudentResponseAction } from "../../../src/actions/classBoard";
import { getStudentResponseSelector, getClassResponseSelector } from "../../../ClassBoard/ducks";
import ClassQuestions from "../../../ClassResponses/components/Container/ClassQuestions";

class Question extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { record, loadStudentResponses, match } = this.props;
    const { testActivityId } = record;
    const { classId } = match.params;

    if (testActivityId) {
      loadStudentResponses({ testActivityId, groupId: classId });
    }
  }

  render() {
    let isEmpty = true;
    const { studentResponse, classResponse } = this.props;
    const currentStudent = {
      studentName: ""
    };
    if (studentResponse) {
      isEmpty = !Object.keys(studentResponse).length;
    }
    return (
      <Fragment>
        {!isEmpty && (
          <ClassQuestions
            currentStudent={currentStudent}
            studentResponse={studentResponse}
            classResponse={classResponse}
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
      classResponse: getClassResponseSelector(state)
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
