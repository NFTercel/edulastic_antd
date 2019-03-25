import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaAngleDoubleRight } from "react-icons/fa";
import { darkBlue, secondaryTextColor } from "@edulastic/colors";

const MoveLink = ({ onClick, children }) => (
  <Link onClick={onClick}>
    <span dangerouslySetInnerHTML={{ __html: children }} />
  </Link>
);

MoveLink.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired
};

export default MoveLink;

const Link = styled.a`
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  text-decoration: none;
  color: ${secondaryTextColor};
  cursor: pointer;

  :hover {
    color: ${darkBlue};
  }

  span {
    font-size: 15px;
    font-weight: 500;
    max-width: 470px;
  }
  img {
    display: block;
    max-width: 300px;
  }
`;
