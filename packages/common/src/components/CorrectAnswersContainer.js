import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { dashBorderColor } from "@edulastic/colors";
import { Subtitle } from "@edulastic/common";

const CorrectAnswersContainer = ({ title, children }) => (
  <Container>
    <Subtitle style={{ marginBottom: 30 }}>{title}</Subtitle>
    {children}
  </Container>
);

CorrectAnswersContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any
};

CorrectAnswersContainer.defaultProps = {
  children: null
};

export default CorrectAnswersContainer;

const Container = styled.div`
  margin: 20px 0;
  padding: 22px 35px;
  min-height: 206px;
  border-radius: 10px;
  background-color: ${dashBorderColor};
  flex-grow: 1;
`;
