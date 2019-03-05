import React from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "antd";
import { checkAnswerEvaluation } from "../../actions/checkanswer";

class ToolbarModal extends React.Component {
  checkAnswer = () => {
    const { onClose, checkAnswerEvaluation } = this.props;
    checkAnswerEvaluation();
    onClose();
  };

  hint = () => {
    const { onClose } = this.props;
    onClose();
  };

  bookmark = () => {
    const { onClose } = this.props;
    onClose();
  };

  pointer = () => {
    const { onClose } = this.props;
    onClose();
  };

  inchRuler = () => {
    const { onClose } = this.props;
    onClose();
  };

  centimeterRuler = () => {
    const { onClose } = this.props;
    onClose();
  };

  calculator = () => {
    const { onClose } = this.props;
    onClose();
  };

  eliminationQuestion = () => {
    const { onClose } = this.props;
    onClose();
  };

  procractorRuler = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { isVisible, onClose } = this.props;
    return (
      <Modal open={isVisible} onClose={onClose} showCloseIcon={false} styles={{ modal: { borderRadius: 4 } }} center>
        <Container>
          <StyledButton onClick={() => this.checkAnswer()}>Check Answer</StyledButton>
          <StyledButton onClick={() => this.hint()}>Hint</StyledButton>
          <StyledButton onClick={() => this.bookmark()}>Bookmark</StyledButton>
          <StyledButton onClick={() => this.pointer()}>Pointer</StyledButton>
          <StyledButton onClick={() => this.inchRuler()}>Inch Ruler</StyledButton>
          <StyledButton onClick={() => this.centimeterRuler()}>Centimeter Ruler</StyledButton>
          <StyledButton onClick={() => this.calculator()}>Calculator</StyledButton>
          <StyledButton onClick={() => this.eliminationQuestion()}>Elimination Question</StyledButton>
          <StyledButton onClick={() => this.procractorRuler()}>Procractor Ruler</StyledButton>
        </Container>
      </Modal>
    );
  }
}

ToolbarModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  checkanswer: PropTypes.func.isRequired
};

export default connect(
  null,
  { checkAnswerEvaluation }
)(ToolbarModal);

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
