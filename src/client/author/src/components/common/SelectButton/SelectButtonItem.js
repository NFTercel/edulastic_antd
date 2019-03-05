import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { textColor, blue, white } from "@edulastic/colors";

const SelectButtonItem = ({ icon, children, onClick }) => (
  <Container onClick={onClick}>
    {icon && <Icon>{icon}</Icon>}
    <span>{children}</span>
  </Container>
);

SelectButtonItem.propTypes = {
  icon: PropTypes.any,
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired
};

SelectButtonItem.defaultProps = {
  icon: null
};

export default SelectButtonItem;

const Container = styled.div`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  color: ${textColor};

  :hover {
    background: ${blue};
    color: ${white};
  }
`;

const Icon = styled.span`
  margin-right: 15px;
`;
