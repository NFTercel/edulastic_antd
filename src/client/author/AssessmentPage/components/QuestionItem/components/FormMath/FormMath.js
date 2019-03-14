import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { themes } from "../../../../../../assessment/themes";
import { QuestionText } from "../../common/Form";
import { MathAnswer } from "./styled";

export default class FormMath extends React.Component {
  static propTypes = {
    saveAnswer: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(["edit", "review"]).isRequired,
    question: PropTypes.object.isRequired
  };

  state = {
    currentValue: ""
  };

  handleChange = value => {
    const { saveAnswer } = this.props;

    this.setState({ currentValue: value }, () => {
      saveAnswer(value);
    });
  };

  renderView = () => {
    const {
      question: {
        validation: {
          valid_response: { value }
        }
      }
    } = this.props;
    const answer = value[0];

    if (!answer || !answer.value) return null;

    return <QuestionText>{answer.value}</QuestionText>;
  };

  renderForm = () => {
    const { currentValue } = this.state;
    const {
      question: { numberPad, symbols }
    } = this.props;

    return (
      <ThemeProvider theme={themes.default}>
        <MathAnswer
          onInput={this.handleChange}
          numberPad={numberPad}
          symbols={symbols}
          value={currentValue}
          fullWidth
        />
      </ThemeProvider>
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
