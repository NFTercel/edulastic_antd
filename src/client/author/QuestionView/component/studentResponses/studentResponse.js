import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { CircularDiv, ResponseCard } from "../../styled";

const StudentResponse = props => (
  <Fragment>
    <ResponseCard>
      Student Response
      {props.testActivity.map(student => (
        <CircularDiv>{student.studentName.toUpperCase().substr(0, 2)}</CircularDiv>
      ))}
    </ResponseCard>
  </Fragment>
);

export default StudentResponse;

StudentResponse.propTypes = {
  testActivity: PropTypes.object.isRequired
};
