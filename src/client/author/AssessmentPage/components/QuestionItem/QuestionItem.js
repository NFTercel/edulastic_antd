import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { Draggable } from "react-drag-and-drop";

import { SHORT_TEXT, MULTIPLE_CHOICE, CLOZE_DROP_DOWN, MATH } from "@edulastic/constants/const/questionType";
import { IconPencilEdit } from "@edulastic/icons";
import { MathInput } from "@edulastic/common";

import { QuestionItemWrapper, QuestionNumber, QuestionForm, QuestionOption, EditButton, QuestionText } from "./styled";

export default class QuestionItem extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    question: PropTypes.object.isRequired,
    onCreateOptions: PropTypes.func.isRequired,
    onOpenEdit: PropTypes.func.isRequired
  };

  state = {
    dragging: false
  };

  onDragStart = () => this.setState({ dragging: true });

  onDragEnd = () => this.setState({ dragging: false });

  renderMultipleChoice = () => {
    const {
      question: { id, type, options },
      onCreateOptions
    } = this.props;

    return options.length > 0 ? (
      options.map(({ label, value }) => <QuestionOption key={label + value}>{label}</QuestionOption>)
    ) : (
      <Input size="large" onPressEnter={onCreateOptions(id, type)} />
    );
  };

  renderText = () => {
    const {
      question: {
        id,
        type,
        validation: { valid_response }
      },
      onCreateOptions
    } = this.props;

    return valid_response.value && valid_response.value.length > 0 ? (
      <QuestionText>{valid_response.value}</QuestionText>
    ) : (
      <Input size="large" onPressEnter={onCreateOptions(id, type)} />
    );
  };

  renderSelect = () => {
    const {
      question: { options }
    } = this.props;

    return options[0].map((option, key) => <QuestionOption key={option + key}>{option}</QuestionOption>);
  };

  renderMath = () => {
    const {
      question: {
        validation: { valid_response }
      }
    } = this.props;
    const answer = valid_response.value[0];

    return answer && answer.value && <QuestionText>{answer.value}</QuestionText>;
  };

  render() {
    const { dragging } = this.state;
    const {
      question: { id, type },
      index,
      onOpenEdit
    } = this.props;

    return (
      <QuestionItemWrapper>
        <Draggable
          type="question"
          data={JSON.stringify({ id, index })}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <QuestionNumber dragging={dragging}>{index + 1}</QuestionNumber>
        </Draggable>
        <QuestionForm>
          {type === MULTIPLE_CHOICE && this.renderMultipleChoice()}
          {type === SHORT_TEXT && this.renderText()}
          {type === CLOZE_DROP_DOWN && this.renderSelect()}
          {type === MATH && this.renderMath()}
        </QuestionForm>
        <EditButton onClick={onOpenEdit}>
          <IconPencilEdit />
        </EditButton>
      </QuestionItemWrapper>
    );
  }
}
