import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { blue, darkBlue } from '@edulastic/colors';

const MoveLink = ({ onClick, children }) => (
  <Link onClick={onClick}>
    <span>{children}</span>
    <FaAngleDoubleRight style={{ marginLeft: 5 }} />
  </Link>
);

MoveLink.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MoveLink;

const Link = styled.a`
  font-size: 16px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  text-decoration: none;
  color: ${blue};
  cursor: pointer;

  :hover {
    color: ${darkBlue};
  }
`;
