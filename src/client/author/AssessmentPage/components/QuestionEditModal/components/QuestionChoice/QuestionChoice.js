import React from "react";
import PropTypes from "prop-types";
import { Input, Checkbox, InputNumber } from "antd";

import { IconPencilEdit } from "@edulastic/icons";

import { EXACT_MATCH } from "../../../../../../assessment/constants/constantsForQuestions";
import { QuestionFormWrapper, FormGroup, FormLabel, Points } from "../../common/QuestionForm";

const { Group: CheckboxGroup } = Checkbox;

const defaultState = {
  optionsValue: "",
  correctAnswers: [],
  score: 1,
  optionsDisabled: true
};

export default class QuestionChoice extends React.Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  state = defaultState;

  componentDidMount() {
    const { question } = this.props;
    this.setDefaultState(question);
  }

  componentWillReceiveProps(nextProps) {
    const { question: prevQuestion } = this.props;
    const { question: nextQuestion } = nextProps;

    if (prevQuestion.id !== nextQuestion.id) {
      this.setDefaultState(nextQuestion);
    }
  }

  setDefaultState = question => {
    const { options, validation } = question;
    const { valid_response } = validation;

    this.setState({
      optionsValue: options.map(o => o.label).join(" "),
      score: valid_response.score,
      correctAnswers: valid_response.value
    });
  };

  handleSetOptions = ({ target: { value } }) => {
    const { onUpdate } = this.props;

    const options = value.split(" ");

    const data = {
      options: options.map((option, index) => ({
        label: option,
        value: index + 1
      }))
    };

    onUpdate(data);

    this.handleToggleOptionsDisabled();
  };

  handleChangeOptions = ({ target: { value } }) => this.setState({ optionsValue: value });

  handleSetCorrectAnswers = checked => {
    const { score } = this.state;
    const { onUpdate } = this.props;

    this.setState(
      {
        correctAnswers: checked
      },
      () => {
        const data = {
          validation: {
            scoring_type: EXACT_MATCH,
            valid_response: {
              value: checked,
              score
            }
          },
          multiple_responses: checked.length > 1
        };

        onUpdate(data);
      }
    );
  };

  handleSetScore = score => {
    const { correctAnswers } = this.state;
    const { onUpdate } = this.props;

    this.setState({ score }, () => {
      const data = {
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            value: correctAnswers,
            score
          }
        },
        multiple_responses: correctAnswers.length > 1
      };

      onUpdate(data);
    });
  };

  handleToggleOptionsDisabled = () =>
    this.setState(({ optionsDisabled }) => ({
      optionsDisabled: !optionsDisabled
    }));

  renderEditButton = () => (
    <div onClick={this.handleToggleOptionsDisabled}>
      <IconPencilEdit />
    </div>
  );

  render() {
    const { optionsValue, optionsDisabled, correctAnswers, score } = this.state;
    const {
      question: { options }
    } = this.props;

    return (
      <QuestionFormWrapper>
        <FormGroup>
          <FormLabel>Options</FormLabel>
          <Input
            value={optionsValue}
            onChange={this.handleChangeOptions}
            onPressEnter={this.handleSetOptions}
            disabled={optionsDisabled}
            addonAfter={this.renderEditButton()}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Correct Answers</FormLabel>
          <CheckboxGroup options={options} value={correctAnswers} onChange={this.handleSetCorrectAnswers} />
          <InputNumber value={score} onChange={this.handleSetScore} />
          <Points>Points</Points>
        </FormGroup>
      </QuestionFormWrapper>
    );
  }
}
