import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import { SHORT_TEXT, MULTIPLE_CHOICE, CLOZE_DROP_DOWN, MATH } from "@edulastic/constants/const/questionType";
import { IconNewList, IconPencilEdit, IconCaretDown, IconMath } from "@edulastic/icons";

import AddBulkModal from "../AddBulkModal/AddBulkModal";
import { AddQuestionWrapper, AddQuestionIcon, QuestionTypes, ContentWrapper, AddButton } from "./styled";

class AddQuestion extends React.Component {
  state = {
    bulkModalVisible: false
  };

  toggleBulkModal = () => {
    this.setState(({ bulkModalVisible }) => ({
      bulkModalVisible: !bulkModalVisible
    }));
  };

  handleApply = ({ number, type }) => {
    const { onAdd } = this.props;

    for (let i = 0; i < number; i++) {
      onAdd(type)();
    }

    this.toggleBulkModal();
  };

  render() {
    const { bulkModalVisible } = this.state;
    const { onAdd } = this.props;
    return (
      <AddQuestionWrapper>
        <ContentWrapper>
          <QuestionTypes>
            <AddQuestionIcon onClick={onAdd(MULTIPLE_CHOICE)}>
              <IconNewList />
            </AddQuestionIcon>
            <AddQuestionIcon onClick={onAdd(SHORT_TEXT)}>
              <IconPencilEdit />
            </AddQuestionIcon>
            <AddQuestionIcon onClick={onAdd(CLOZE_DROP_DOWN)}>
              <IconCaretDown />
            </AddQuestionIcon>
            <AddQuestionIcon onClick={onAdd(MATH)}>
              <IconMath />
            </AddQuestionIcon>
          </QuestionTypes>
          <QuestionTypes>
            <AddButton onClick={this.toggleBulkModal}>Add Bulk</AddButton>
          </QuestionTypes>
          <AddBulkModal visible={bulkModalVisible} onCancel={this.toggleBulkModal} onApply={this.handleApply} />
        </ContentWrapper>
      </AddQuestionWrapper>
    );
  }
}

AddQuestion.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default AddQuestion;
