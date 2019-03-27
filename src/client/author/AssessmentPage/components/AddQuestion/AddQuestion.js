import React from "react";
import PropTypes from "prop-types";

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

  handleApply = ({ number, type, startingIndex }) => {
    const { onAddQuestion } = this.props;

    for (let i = 0; i < number; i++) {
      const index = startingIndex + i;
      onAddQuestion(type, index)();
    }

    this.toggleBulkModal();
  };

  render() {
    const { bulkModalVisible } = this.state;
    const { onAddQuestion, onAddSection } = this.props;
    return (
      <AddQuestionWrapper>
        <ContentWrapper>
          <QuestionTypes>
            <AddQuestionIcon onClick={onAddQuestion(MULTIPLE_CHOICE)}>
              <IconNewList />
            </AddQuestionIcon>
            <AddQuestionIcon onClick={onAddQuestion(SHORT_TEXT)}>
              <IconPencilEdit />
            </AddQuestionIcon>
            <AddQuestionIcon onClick={onAddQuestion(CLOZE_DROP_DOWN)}>
              <IconCaretDown />
            </AddQuestionIcon>
            <AddQuestionIcon onClick={onAddQuestion(MATH)}>
              <IconMath />
            </AddQuestionIcon>
          </QuestionTypes>
          <QuestionTypes>
            <AddButton onClick={this.toggleBulkModal}>Add Bulk</AddButton>
            <AddButton onClick={onAddSection}>Add Section</AddButton>
          </QuestionTypes>
          <AddBulkModal visible={bulkModalVisible} onCancel={this.toggleBulkModal} onApply={this.handleApply} />
        </ContentWrapper>
      </AddQuestionWrapper>
    );
  }
}

AddQuestion.propTypes = {
  onAddQuestion: PropTypes.func.isRequired,
  onAddSection: PropTypes.func.isRequired
};

export default AddQuestion;
