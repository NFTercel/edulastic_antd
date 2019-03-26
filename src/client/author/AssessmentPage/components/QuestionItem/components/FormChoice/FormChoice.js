import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { isUndefined, chunk } from "lodash";

import { QuestionOption, QuestionChunk } from "../../common/Form";

export default class FormChoice extends React.Component {
  static propTypes = {
    saveAnswer: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(["edit", "review"]).isRequired,
    question: PropTypes.object.isRequired,
    onCreateOptions: PropTypes.func.isRequired,
    evaluation: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    answer: PropTypes.array
  };

  static defaultProps = {
    evaluation: undefined,
    answer: []
  };

  constructor(props) {
    super(props);

    this.state = {
      currentValue: props.answer
    };
  }

  handleSelect = nextValue => () => {
    const { currentValue } = this.state;
    const {
      question: { multiple_responses: multipleResponses }
    } = this.props;

    if (!multipleResponses) {
      this.saveValue([nextValue]);
      return;
    }

    const valueIndex = currentValue.findIndex(v => v === nextValue);
    const toggledValue = [...currentValue];

    if (valueIndex > -1) {
      toggledValue.splice(valueIndex, 1);
    } else {
      toggledValue.push(nextValue);
      toggledValue.sort();
    }

    this.saveValue(toggledValue);
  };

  saveValue = currentValue => {
    const { saveAnswer } = this.props;

    this.setState({ currentValue }, () => {
      saveAnswer(currentValue);
    });
  };

  renderView = () => {
    const {
      question: { options }
    } = this.props;

    if (!options.length) return this.renderOptionsCreateForm();

    const optionChunks = chunk(options, 4);

    return optionChunks.map((items, chunkKey) => (
      <QuestionChunk key={`form-choice-chunk-${chunkKey}`}>
        {items.map(({ label }, key) => (
          <QuestionOption key={label + key}>{label}</QuestionOption>
        ))}
      </QuestionChunk>
    ));
  };

  renderForm = () => {
    const { currentValue } = this.state;
    const {
      question: { options, multiple_responses: multipleResponses },
      evaluation,
      view
    } = this.props;

    const getCorrect = value => {
      if (!multipleResponses) {
        return currentValue.includes(value) && evaluation[0];
      }

      const valueIndex = currentValue.findIndex(item => item === value);

      if (valueIndex > -1) {
        return evaluation[valueIndex];
      }

      return false;
    };

    const optionChunks = chunk(options, 4);

    return optionChunks.map((items, chunkKey) => (
      <QuestionChunk key={`form-choice-chunk-${chunkKey}`}>
        {items.map(({ label, value }, key) => (
          <QuestionOption
            key={`form-${label}-${key}`}
            selected={currentValue.includes(value)}
            correct={evaluation && getCorrect(value)}
            checked={!isUndefined(evaluation) && view !== "clear"}
            onClick={this.handleSelect(value)}
            review
          >
            {label}
          </QuestionOption>
        ))}
      </QuestionChunk>
    ));
  };

  renderOptionsCreateForm = () => {
    const {
      question: { id, type },
      onCreateOptions
    } = this.props;

    return <Input size="large" onPressEnter={onCreateOptions(id, type)} />;
  };

  render() {
    const { mode } = this.props;

    switch (mode) {
      case "edit":
        return this.renderView();
      case "review":
        return this.renderForm();
      default:
        return null;
    }
  }
}
