import React from "react";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";
import { Button, Select } from "antd";

import { SHORT_TEXT, MULTIPLE_CHOICE, CLOZE_DROP_DOWN, MATH } from "@edulastic/constants/const/questionType";

import { ModalWrapper, ModalHeader, ModalFooter } from "../../common/Modal";
import { FormGroup, FormLabel, FormInline, QuestionFormWrapper } from "../QuestionEditModal/common/QuestionForm";
import { BulkTitle, NumberInput, TypeOfQuestion, StartingIndexInput, TypeOfQuestionSelect } from "./styled";

const modalStyles = {
  modal: {
    background: "#f8f8f8",
    borderRadius: "4px 4px 0 0",
    padding: "19px 28px 40px 28px"
  }
};

export default class AddBulkModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onApply: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  state = {
    number: 2,
    type: MULTIPLE_CHOICE,
    startingIndex: 0
  };

  handleChange = field => value =>
    this.setState({
      [field]: value
    });

  handleApply = () => {
    const { number, type, startingIndex } = this.state;
    const { onApply } = this.props;
    onApply({ number, type, startingIndex });
  };

  render() {
    const { number, type, startingIndex } = this.state;
    const { onCancel, visible } = this.props;
    return (
      <Modal open={visible} onClose={onCancel} styles={modalStyles} center>
        <ModalWrapper>
          <ModalHeader>
            <BulkTitle>Add Bulk</BulkTitle>
          </ModalHeader>
          <QuestionFormWrapper>
            <FormInline>
              <FormGroup>
                <FormLabel>Number</FormLabel>
                <NumberInput value={number} onChange={this.handleChange("number")} />
              </FormGroup>
              <TypeOfQuestion>
                <FormLabel>Type of Question</FormLabel>
                <TypeOfQuestionSelect value={type} onChange={this.handleChange("type")}>
                  <Select.Option value={MULTIPLE_CHOICE}>Multiple Choice</Select.Option>
                  <Select.Option value={SHORT_TEXT}>Text</Select.Option>
                  <Select.Option value={CLOZE_DROP_DOWN}>Select</Select.Option>
                  <Select.Option value={MATH}>Math</Select.Option>
                </TypeOfQuestionSelect>
              </TypeOfQuestion>
            </FormInline>
            <FormGroup>
              <FormLabel>Starting Index</FormLabel>
              <StartingIndexInput value={startingIndex} onChange={this.handleChange("startingIndex")} />
            </FormGroup>
          </QuestionFormWrapper>
          <ModalFooter>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={this.handleApply}>Apply</Button>
          </ModalFooter>
        </ModalWrapper>
      </Modal>
    );
  }
}
