import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { CircularDiv, ResponseCard, StyledFlexContainer, ResponseCardTitle } from "../../styled";

const StudentResponse = ({ testActivity }) => (
  <Fragment>
    <StyledFlexContainer>
      <ResponseCard>
        <ResponseCardTitle>Student Response</ResponseCardTitle>
        {testActivity.map((student, index) => (
          <CircularDiv key={index}>{student.studentName.toUpperCase().substr(0, 2)}</CircularDiv>
        ))}
      </ResponseCard>
    </StyledFlexContainer>
  </Fragment>
);

export default StudentResponse;

StudentResponse.propTypes = {
  testActivity: PropTypes.object.isRequired
};
