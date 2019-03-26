import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-drag-and-drop";
import { isArray, isUndefined, isNull } from "lodash";

import { SHORT_TEXT, MULTIPLE_CHOICE, CLOZE_DROP_DOWN, MATH } from "@edulastic/constants/const/questionType";
import { IconPencilEdit, IconCheck, IconClose } from "@edulastic/icons";

import withAnswerSave from "../../../../assessment/components/HOC/withAnswerSave";
import FormChoice from "./components/FormChoice/FormChoice";
import FormText from "./components/FormText/FormText";
import FormDropdown from "./components/FormDropdown/FormDropdown";
import FormMath from "./components/FormMath/FormMath";
import {
  QuestionItemWrapper,
  QuestionNumber,
  QuestionForm,
  EditButton,
  AnswerForm,
  AnswerIndicator,
  CorrectAnswer,
  CorrectAnswerTitle,
  CorrectAnswerValue
} from "./styled";

class QuestionItem extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    onCreateOptions: PropTypes.func.isRequired,
    onOpenEdit: PropTypes.func.isRequired,
    saveAnswer: PropTypes.func.isRequired,
    evaluation: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    userAnswer: PropTypes.any,
    previewMode: PropTypes.string.isRequired,
    viewMode: PropTypes.string.isRequired,
    answer: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    centered: PropTypes.bool
  };

  static defaultProps = {
    evaluation: undefined,
    userAnswer: undefined,
    answer: undefined,
    centered: false
  };

  state = {
    dragging: false
  };

  handleDragStart = () => this.setState({ dragging: true });

  handleDragEnd = () => this.setState({ dragging: false });

  renderMultipleChoiceAnswer = (value, options) => {
    const labels = value.reduce((result, current) => {
      const option = options.find(o => o.value === current);

      if (!option) return result;

      return [...result, option.label];
    }, []);

    return labels.join(", ");
  };

  renderShortTextAnswer = value => value;

  renderDropDownAnswer = value => value.join(", ");

  renderMathAnswer = value => value.map(answer => answer.value).join(", ");

  renderCorrectAnswer = () => {
    const {
      data: {
        type,
        validation: {
          valid_response: { value }
        },
        options
      },
      evaluation
    } = this.props;

    const allCorrect = isArray(evaluation) ? evaluation.filter(v => !isNull(v)).every(v => v) : evaluation;

    if (allCorrect) return null;

    let answerRenderer;

    switch (type) {
      case MULTIPLE_CHOICE:
        answerRenderer = this.renderMultipleChoiceAnswer;
        break;
      case SHORT_TEXT:
        answerRenderer = this.renderShortTextAnswer;
        break;
      case CLOZE_DROP_DOWN:
        answerRenderer = this.renderDropDownAnswer;
        break;
      case MATH:
        answerRenderer = this.renderMathAnswer;
        break;
      default:
        answerRenderer = () => {};
    }

    return (
      <CorrectAnswer>
        <CorrectAnswerTitle>Correct Answer:</CorrectAnswerTitle>
        <CorrectAnswerValue>{answerRenderer(value, options)}</CorrectAnswerValue>
      </CorrectAnswer>
    );
  };

  renderContent = () => {
    const { data, saveAnswer, viewMode, onCreateOptions, evaluation, answer, previewMode } = this.props;

    const props = {
      saveAnswer,
      answer,
      question: data,
      mode: viewMode,
      view: previewMode
    };

    switch (data.type) {
      case MULTIPLE_CHOICE:
        return <FormChoice onCreateOptions={onCreateOptions} evaluation={evaluation} {...props} />;
      case SHORT_TEXT:
        return <FormText onCreateAnswer={onCreateOptions} {...props} />;
      case CLOZE_DROP_DOWN:
        return <FormDropdown {...props} />;
      case MATH:
        return <FormMath {...props} />;
      default:
        return null;
    }
  };

  renderEditButton = () => {
    const { onOpenEdit } = this.props;
    return (
      <EditButton onClick={onOpenEdit}>
        <IconPencilEdit />
      </EditButton>
    );
  };

  renderAnswerIndicator = () => {
    const { evaluation } = this.props;

    if (isUndefined(evaluation)) {
      return null;
    }

    const correct = isArray(evaluation) ? evaluation.every(value => value) : evaluation;

    return <AnswerIndicator correct={correct}>{correct ? <IconCheck /> : <IconClose />}</AnswerIndicator>;
  };

  render() {
    const { dragging } = this.state;
    const {
      data: { id, qIndex },
      index,
      viewMode,
      previewMode,
      centered
    } = this.props;

    const review = viewMode === "review";

    return (
      <QuestionItemWrapper centered={centered}>
        <AnswerForm>
          <Draggable
            type="question"
            data={JSON.stringify({ id, index: qIndex || index })}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            enabled={!review}
          >
            <QuestionNumber dragging={dragging}>{qIndex || index + 1}</QuestionNumber>
          </Draggable>
          <QuestionForm>{this.renderContent()}</QuestionForm>
          {!review && this.renderEditButton()}
          {review && previewMode !== "clear" && this.renderAnswerIndicator()}
        </AnswerForm>
        {review && previewMode === "show" && this.renderCorrectAnswer()}
      </QuestionItemWrapper>
    );
  }
}

export default withAnswerSave(QuestionItem);
