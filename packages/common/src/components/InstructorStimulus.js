import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import helpers from '../helpers';

const InstructorStimulus = ({ children }) =>
  (!helpers.isEmpty(children) ? <Wrapper dangerouslySetInnerHTML={{ __html: children }} /> : null);

InstructorStimulus.propTypes = {
  children: PropTypes.string
};

InstructorStimulus.defaultProps = {
  children: ''
};

const Wrapper = styled.div`
  padding: 25px;
  background: #e5f2fb;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export default InstructorStimulus;
