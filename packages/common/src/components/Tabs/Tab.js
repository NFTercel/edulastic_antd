import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { textColor, blue, mobileWidth, greenDark, mainBgColor } from "@edulastic/colors";
import { IconPencilEdit, IconClose } from "@edulastic/icons";

const Tab = ({ label, onClick, active, style, editable, close, onClose, onChange }) => {
  const inputTab = (
    <EditableTab onClick={onClick}>
      <Input type="text" value={label} onChange={onChange} />
      <IconPencilEdit color={greenDark} width={16} height={16} />
    </EditableTab>
  );
  const closeButton = (
    <CloseIcon>
      <IconClose color={blue} width={10} height={10} onClick={onClose} />
    </CloseIcon>
  );
  const labelBar = <span onClick={onClick}>{label}</span>;
  return (
    <Container active={active} style={style}>
      {editable ? inputTab : labelBar}
      {close && closeButton}
    </Container>
  );
};

Tab.propTypes = {
  label: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  style: PropTypes.object,
  editable: PropTypes.bool,
  close: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func
};

Tab.defaultProps = {
  onClick: () => {},
  active: false,
  style: {},
  editable: false,
  close: false,
  onChange: () => {},
  onClose: evt => {
    evt.stopPropagation();
  }
};

export default Tab;

const Container = styled.div`
  color: ${({ active }) => (active ? blue : textColor)};
  padding: 10px 25px;
  cursor: pointer;
  border-bottom: 2px solid ${({ active }) => (active ? blue : mainBgColor)};

  @media (max-width: ${mobileWidth}) {
    width: 50%;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  border: 0;
  width: 100%;
  text-align: center;
  outline: none;
`;

const EditableTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseIcon = styled.span`
  margin-left: 10px;
`;
