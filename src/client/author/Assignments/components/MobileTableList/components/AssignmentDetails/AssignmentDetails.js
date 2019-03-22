import React from "react";
import PropTypes from "prop-types";

import { Container, Title, Value } from "./styled";

const AssignmentDetails = ({ title, value }) => (
  <Container>
    <Title>{title}</Title>
    <Value>{value}</Value>
  </Container>
);

AssignmentDetails.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node])
};

AssignmentDetails.defaultProps = {
  value: ""
};

export default AssignmentDetails;
