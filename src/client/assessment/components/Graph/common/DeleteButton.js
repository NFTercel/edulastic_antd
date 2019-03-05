import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconTrashAlt } from "@edulastic/icons";
import { green, greenDark, red, lightGrey } from "@edulastic/colors";

const DeleteButton = ({ onDelete, deleteToolStyles }) => (
  <Container style={deleteToolStyles} onClick={onDelete}>
    <IconTrashAlt color={greenDark} hoverColor={red} width={16} height={16} />
  </Container>
);

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  deleteToolStyles: PropTypes.object
};

DeleteButton.defaultProps = {
  deleteToolStyles: {}
};

export default DeleteButton;

const Container = styled.div`
  width: ${props => (props.width ? props.width : "40px")};
  height: ${props => (props.height ? props.height : "40px")};
  display: inline-flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  color: ${green};
  font-weight: 300;
  margin-left: ${props => (props.marginLeft ? props.marginLeft : "0")}
  margin-left: ${props => (props.marginRight ? props.marginRight : "0")}

  :hover {
    cursor: pointer;
    color: ${red};
    background: ${lightGrey};
  }

  svg {
    height: 20px !important;
    width: 20px !important;
  }
`;
