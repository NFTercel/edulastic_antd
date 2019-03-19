import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

import { QuestionOption } from "../../common/Form";
import { Dropdown } from "./styled";

export default class FormDropdown extends React.Component {
  static propTypes = {
    saveAnswer: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(["edit", "review"]).isRequired,
    question: PropTypes.object.isRequired,
    answer: PropTypes.string
  };

  static defaultProps = {
    answer: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      currentValue: props.answer
    };
  }

  handleChange = value => {
    const { saveAnswer } = this.props;

    this.setState({ currentValue: value }, () => {
      saveAnswer([value]);
    });
  };

  renderView = () => {
    const {
      question: { options }
    } = this.props;

    return options[0].map((option, key) => (
      <QuestionOption key={`dropdown-view-${option}-${key}`}>{option}</QuestionOption>
    ));
  };

  renderForm = () => {
    const { currentValue } = this.state;
    const {
      question: { options }
    } = this.props;

    return (
      <Dropdown value={currentValue} onChange={this.handleChange}>
        {options[0].map((option, key) => (
          <Select.Option key={`dropdown-form-${option}-${key}`} value={option}>
            {option}
          </Select.Option>
        ))}
      </Dropdown>
    );
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
