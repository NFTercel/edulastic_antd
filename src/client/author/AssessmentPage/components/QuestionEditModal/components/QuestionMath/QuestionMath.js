import React from "react";
import PropTypes from "prop-types";
import { InputNumber } from "antd";
import { cloneDeep } from "lodash";
import { ThemeProvider } from "styled-components";

import { math } from "@edulastic/constants";

import { themes } from "../../../../../../assessment/themes";
import MathFormulaAnswerMethod from "../../../../../../assessment/widgets/MathFormula/components/MathFormulaAnswerMethod";
import { EXACT_MATCH } from "../../../../../../assessment/constants/constantsForQuestions";
import { QuestionFormWrapper, FormGroup, FormLabel, Points } from "../../common/QuestionForm";

const { methods } = math;

export default class QuestionMath extends React.Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  handleAnswerChange = (prop, value) => {
    const {
      question: { validation },
      onUpdate
    } = this.props;
    const nextValidation = cloneDeep(validation);

    nextValidation.valid_response.value[0][prop] = value;

    if (
      [
        methods.IS_SIMPLIFIED,
        methods.IS_FACTORISED,
        methods.IS_EXPANDED,
        methods.IS_TRUE,
        methods.EQUIV_SYNTAX
      ].includes(nextValidation.valid_response.value[0].method)
    ) {
      delete nextValidation.valid_response.value[0].value;
    }

    const data = {
      validation: nextValidation
    };

    onUpdate(data);
  };

  handleScoreChange = score => {
    const {
      question: {
        validation: { valid_response }
      }
    } = this.props;
    const { onUpdate } = this.props;

    const data = {
      validation: {
        scoring_type: EXACT_MATCH,
        valid_response: {
          ...valid_response,
          score
        }
      }
    };

    onUpdate(data);
  };

  render() {
    const { question } = this.props;
    const { valid_response: validResponse } = question.validation;
    const { score } = validResponse;
    const value = validResponse.value[0];

    return (
      <ThemeProvider theme={themes.default}>
        <QuestionFormWrapper>
          <FormGroup>
            <FormLabel>Correct Answer</FormLabel>
            <MathFormulaAnswerMethod onChange={this.handleAnswerChange} item={question} {...value} />
          </FormGroup>
          <FormGroup>
            <InputNumber value={score} onChange={this.handleScoreChange} />
            <Points>Points</Points>
          </FormGroup>
        </QuestionFormWrapper>
      </ThemeProvider>
    );
  }
}
