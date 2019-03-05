import React from "react";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "antd";

const SavePauseModalMobile = ({ isVisible, onClose, onExitClick }) => (
  <Modal open={isVisible} onClose={onClose} showCloseIcon={false} styles={{ modal: { borderRadius: 4 } }} center>
    <Container>
      <StyledButton>Save</StyledButton>
      <StyledButton>Pause</StyledButton>
      <StyledButton onClick={onExitClick}>Qui t</StyledButton>
    </Container>
  </Modal>
);

SavePauseModalMobile.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExitClick: PropTypes.func.isRequired
};

export default SavePauseModalMobile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  @media (max-width: 468px) {
    width: calc(100vw - 100px);
  }
`;

const StyledButton = styled(Button)`
  height: 50px;
  text-transform: uppercase;
  border: none;
  border-bottom: 1px solid #f3f3f3;
  border-radius: 0px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  &:active,
  &:focus {
    border-color: #f3f3f3;
  }
`;
