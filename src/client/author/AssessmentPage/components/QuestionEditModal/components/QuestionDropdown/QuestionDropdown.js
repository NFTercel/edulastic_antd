import React from "react";
import PropTypes from "prop-types";
import { Select, InputNumber, Button } from "antd";
import { arrayMove } from "react-sortable-hoc";

import { EXACT_MATCH } from "../../../../../../assessment/constants/constantsForQuestions";
import SortableList from "../../../../../../assessment/components/SortableList";
import { QuestionFormWrapper, FormGroup, FormLabel, Points } from "../../common/QuestionForm";

export default class QuestionDropdown extends React.Component {
  static propTypes = {
    question: PropTypes.object,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    question: {
      options: {
        0: ["A", "B"]
      },
      validation: {
        valid_response: {
          score: 1,
          value: []
        },
        alt_responses: []
      }
    }
  };

  get currentOptions() {
    const {
      question: { options }
    } = this.props;
    return [...options[0]];
  }

  handleSortEnd = ({ oldIndex, newIndex }) => {
    const nextOptions = arrayMove(this.currentOptions, oldIndex, newIndex);

    this.updateOptions(nextOptions);
  };

  handleAdd = () => {
    const nextOptions = this.currentOptions;
    nextOptions.push("New Choice");

    this.updateOptions(nextOptions);
  };

  handleRemove = itemIndex => {
    const nextOptions = this.currentOptions;
    nextOptions.splice(itemIndex, 1);

    this.updateOptions(nextOptions);
  };

  updateOptions = nextOptions => {
    const { onUpdate } = this.props;

    const data = {
      options: {
        0: nextOptions
      }
    };

    onUpdate(data);
  };

  handleOptionChange = (itemIndex, event) => {
    const nextOptions = this.currentOptions;

    nextOptions[itemIndex] = event.target.value;

    this.updateOptions(nextOptions);
  };

  handleValueChange = value => {
    const {
      question: { validation }
    } = this.props;
    const {
      valid_response: { score }
    } = validation;

    this.updateValidation(value, score);
  };

  handleScoreChange = score => {
    const {
      question: { validation }
    } = this.props;
    const {
      valid_response: { value }
    } = validation;

    this.updateValidation(value, score);
  };

  updateValidation = (value, score) => {
    const { onUpdate } = this.props;

    const data = {
      validation: {
        scoring_type: EXACT_MATCH,
        valid_response: {
          value: [value],
          score
        },
        alt_responses: []
      }
    };

    onUpdate(data);
  };

  render() {
    const {
      question: { validation }
    } = this.props;
    const {
      valid_response: { value, score }
    } = validation;

    return (
      <QuestionFormWrapper>
        <FormGroup>
          <FormLabel>Choices</FormLabel>
          <SortableList
            items={this.currentOptions}
            onSortEnd={this.handleSortEnd}
            dirty
            useDragHandle
            onRemove={this.handleRemove}
            onChange={this.handleOptionChange}
          />
          <Button onClick={this.handleAdd}>Add choice</Button>
        </FormGroup>
        <FormGroup>
          <FormLabel>Correct Answer</FormLabel>
          <Select value={value[0]} onChange={this.handleValueChange} style={{ marginRight: "20px" }}>
            {this.currentOptions.map((option, key) => (
              <Select.Option key={key} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
          <InputNumber value={score} onChange={this.handleScoreChange} />
          <Points>Points</Points>
        </FormGroup>
      </QuestionFormWrapper>
    );
  }
}
