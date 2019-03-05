import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mainBgColor } from '@edulastic/colors';
import { Subtitle } from '@edulastic/common';

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
  width: 100%;
  padding: 22px 35px;
  min-height: 206px;
  margin-top: 60px;
  border-radius: 10px;
  background-color: ${mainBgColor};
`;
