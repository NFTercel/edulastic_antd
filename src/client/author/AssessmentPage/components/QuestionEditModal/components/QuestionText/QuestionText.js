import React from "react";
import PropTypes from "prop-types";
import { Input, Select, InputNumber } from "antd";

import { IconPencilEdit } from "@edulastic/icons";

import { EXACT_MATCH, CONTAINS } from "../../../../../../assessment/constants/constantsForQuestions";
import { QuestionFormWrapper, FormGroup, FormLabel, Points } from "../../common/QuestionForm";

export default class QuestionText extends React.Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  state = {
    answer: "",
    score: 1,
    answerDisabled: true,
    allow: EXACT_MATCH
  };

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
    const { validation } = question;
    const {
      valid_response: { value, score, matching_rule }
    } = validation;

    this.setState({
      answer: value,
      score,
      allow: matching_rule || EXACT_MATCH
    });
  };

  handleAnswerChange = ({ target: { value } }) => this.setState({ answer: value });

  handleSetAnswer = ({ target: { value } }) => {
    const { score, allow } = this.state;
    const { onUpdate } = this.props;

    this.setState({ answer: value }, () => {
      const data = {
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            value,
            score,
            matching_rule: allow
          },
          alt_responses: []
        }
      };

      onUpdate(data);
      this.handleToggleAnswerDisabled();
    });
  };

  handleScoreChange = score => {
    const { answer, allow } = this.state;
    const { onUpdate } = this.props;

    this.setState({ score }, () => {
      const data = {
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            value: answer,
            score,
            matching_rule: allow
          },
          alt_responses: []
        }
      };

      onUpdate(data);
    });
  };

  handleAllowChange = allow => {
    const { score, answer } = this.state;
    const { onUpdate } = this.props;

    this.setState({ allow }, () => {
      const data = {
        validation: {
          scoring_type: EXACT_MATCH,
          valid_response: {
            value: answer,
            score,
            matching_rule: allow
          },
          alt_responses: []
        }
      };

      onUpdate(data);
    });
  };

  handleToggleAnswerDisabled = () =>
    this.setState(({ answerDisabled }) => ({
      answerDisabled: !answerDisabled
    }));

  renderEditButton = () => (
    <div onClick={this.handleToggleAnswerDisabled}>
      <IconPencilEdit />
    </div>
  );

  render() {
    const { answer, answerDisabled, score, allow } = this.state;
    return (
      <QuestionFormWrapper>
        <FormGroup>
          <FormLabel>Correct Answer</FormLabel>
          <Input
            value={answer}
            onChange={this.handleAnswerChange}
            onPressEnter={this.handleSetAnswer}
            disabled={answerDisabled}
            addonAfter={this.renderEditButton()}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Allow</FormLabel>
          <Select value={allow} onChange={this.handleAllowChange} style={{ width: "40%" }}>
            <Select.Option value={EXACT_MATCH}>Exact Match</Select.Option>
            <Select.Option value={CONTAINS}>Any Text Containing</Select.Option>
          </Select>
        </FormGroup>
        <FormGroup>
          <InputNumber value={score} onChange={this.handleScoreChange} />
          <Points>Points</Points>
        </FormGroup>
      </QuestionFormWrapper>
    );
  }
}
