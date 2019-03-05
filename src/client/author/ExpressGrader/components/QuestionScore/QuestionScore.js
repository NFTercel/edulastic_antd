import React, { Fragment, Component } from "react";
import { classResponseApi } from "../../../../../../packages/api";
import DisplayScore from "./DisplayScore";

class Question extends Component {
  constructor() {
    super();
    this.state = {
      question: null,
      response: null
    };
    this.fetchStudentResponse = this.fetchStudentResponse.bind(this);
  }

  componentDidMount() {
    const { record } = this.props;
    const { testActivityId } = record;

    if ((testActivityId, record)) {
      this.fetchStudentResponse(testActivityId, record);
    }
  }

  fetchStudentResponse(testActivityId, record) {
    classResponseApi
      .studentResponse({ testActivityId })
      .then(response => {
        const { testActivity, questionActivities } = response;
        const studentResponse = questionActivities.filter(qActivity => qActivity.qid === record.id);

        this.setState({
          question: testActivity,
          response: studentResponse[0]
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
        // this.fetchStudentResponse(testActivityId);
      });
  }

  render() {
    const { viewType } = this.props;
    const { question, response } = this.state;
    const loading = question === null || !Object.keys(question).length;

    return (
      <Fragment>{!loading && <DisplayScore question={question} response={response} viewType={viewType} />}</Fragment>
    );
  }
}

export default Question;
