import React, { Component } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";

import { CorrectAnswerHeader } from "../../styled/CorrectAnswerHeader";
import { CorrectAnswerPointField } from "../../styled/CorrectAnswerPointField";

import Display from "./Display";

class CorrectAnswer extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired,
    onUpdatePoints: PropTypes.func.isRequired,
    onUpdateValidationValue: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    stimulus: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    hasGroupResponses: PropTypes.bool.isRequired,
    templateMarkUp: PropTypes.string.isRequired,
    configureOptions: PropTypes.object.isRequired,
    uiStyle: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const userSelections = Array(props.options.length).fill(false);
    props.response.value.forEach(answer => {
      userSelections[answer] = true;
    });
    this.state = {
      responseScore: props.response.score
    };
  }

  updateScore = e => {
    const { onUpdatePoints } = this.props;
    if (e.target.value < 0) e.target.value = 0;
    this.setState({ responseScore: e.target.value });
    onUpdatePoints(parseFloat(e.target.value, 10));
  };

  handleMultiSelect = answers => {
    const { onUpdateValidationValue } = this.props;
    onUpdateValidationValue(answers);
  };

  render() {
    const { t, options, stimulus, response, templateMarkUp, hasGroupResponses, configureOptions, uiStyle } = this.props;
    const { responseScore } = this.state;
    return (
      <div>
        <CorrectAnswerHeader>
          <CorrectAnswerPointField
            data-cy="points"
            type="number"
            value={responseScore}
            onChange={this.updateScore}
            onBlur={this.updateScore}
            disabled={false}
            min={0}
            step={0.5}
          />
          <span>{t("component.correctanswers.points")}</span>
        </CorrectAnswerHeader>
        <Display
          preview
          setAnswers
          dragHandler
          options={options}
          uiStyle={uiStyle}
          question={stimulus}
          templateMarkUp={templateMarkUp}
          userSelections={response.value}
          configureOptions={configureOptions}
          onChange={this.handleMultiSelect}
          hasGroupResponses={hasGroupResponses}
        />
      </div>
    );
  }
}

export default withNamespaces("assessment")(CorrectAnswer);
