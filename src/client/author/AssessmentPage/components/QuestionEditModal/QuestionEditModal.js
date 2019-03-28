import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import Modal from "react-responsive-modal";

import { SHORT_TEXT, MULTIPLE_CHOICE, CLOZE_DROP_DOWN, MATH } from "@edulastic/constants/const/questionType";

import { QuestionNumber } from "../QuestionItem/styled";
import { ModalWrapper, ModalTitle, ModalHeader, ModalFooter } from "../../common/Modal";
import QuestionChoice from "./components/QuestionChoice/QuestionChoice";
import QuestionText from "./components/QuestionText/QuestionText";
import QuestionDropdown from "./components/QuestionDropdown/QuestionDropdown";
import QuestionMath from "./components/QuestionMath/QuestionMath";

const questionTypeTitles = {
  [MULTIPLE_CHOICE]: "Multiple Choice",
  [MATH]: "Math",
  [CLOZE_DROP_DOWN]: "Question Dropdown",
  [SHORT_TEXT]: "Text Entry"
};

const modalStyles = {
  modal: {
    background: "#f8f8f8",
    borderRadius: "4px 4px 0 0",
    padding: "19px 28px 40px 28px"
  }
};

export default class QuestionEditModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    question: PropTypes.object,
    index: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCurrentChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    question: undefined
  };

  static defaultProps = {
    visible: false
  };

  renderForm = type => {
    const { question, onUpdate } = this.props;

    const props = {
      question,
      onUpdate
    };

    switch (type) {
      case MULTIPLE_CHOICE:
        return <QuestionChoice {...props} />;
      case SHORT_TEXT:
        return <QuestionText {...props} />;
      case CLOZE_DROP_DOWN:
        return <QuestionDropdown {...props} />;
      case MATH:
        return <QuestionMath {...props} />;
      default:
        return null;
    }
  };

  render() {
    const { visible, onClose, question, index, onCurrentChange } = this.props;

    if (!question) {
      return null;
    }

    const { type, qIndex } = question;

    return (
      <Modal open={visible} onClose={onClose} styles={modalStyles} center>
        <ModalWrapper>
          <ModalHeader>
            <QuestionNumber>{qIndex || index + 1}</QuestionNumber>
            <ModalTitle>{questionTypeTitles[type]}</ModalTitle>
          </ModalHeader>
          {this.renderForm(type)}
          <ModalFooter>
            <Button onClick={onCurrentChange(index - 1)}>Previous</Button>
            <Button onClick={onCurrentChange(index + 1)}>Next</Button>
          </ModalFooter>
        </ModalWrapper>
      </Modal>
    );
  }
}
