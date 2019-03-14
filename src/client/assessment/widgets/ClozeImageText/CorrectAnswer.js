import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { withNamespaces } from "@edulastic/localization";

import { CorrectAnswerPointField } from "../../styled/CorrectAnswerPointField";

import { Points } from "./styled/Points";
import { CorrectAnswerHeader } from "./styled/CorrectAnswerHeader";
import Display from "./Display";
import { getQuestionDataSelector } from "../../../author/QuestionEditor/ducks";

class CorrectAnswer extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired,
    onUpdatePoints: PropTypes.func.isRequired,
    onUpdateValidationValue: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    stimulus: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    maxRespCount: PropTypes.number.isRequired,
    configureOptions: PropTypes.object.isRequired,
    uiStyle: PropTypes.object.isRequired,
    imageUrl: PropTypes.string.isRequired,
    responses: PropTypes.array.isRequired,
    showDashedBorder: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    imageAlterText: PropTypes.string.isRequired,
    imageWidth: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired
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
    const {
      t,
      options,
      stimulus,
      response,
      imageUrl,
      responses,
      configureOptions,
      imageAlterText,
      imageWidth,
      uiStyle,
      showDashedBorder,
      backgroundColor,
      maxRespCount,
      item
    } = this.props;
    const { responseScore } = this.state;
    return (
      <div>
        <CorrectAnswerHeader>
          <CorrectAnswerPointField
            type="number"
            value={responseScore}
            onChange={this.updateScore}
            onBlur={this.updateScore}
            disabled={false}
            min={0}
            step={0.5}
            data-cy="point-field"
          />
          <Points>{t("component.correctanswers.points")}</Points>
        </CorrectAnswerHeader>
        <Display
          preview
          setAnswers
          dragHandler
          options={options}
          uiStyle={uiStyle}
          item={item}
          question={stimulus}
          showDashedBorder={showDashedBorder}
          responseContainers={responses}
          maxRespCount={maxRespCount}
          imageUrl={imageUrl}
          backgroundColor={backgroundColor}
          userSelections={response.value}
          imageAlterText={imageAlterText}
          imageWidth={imageWidth}
          configureOptions={configureOptions}
          onChange={this.handleMultiSelect}
        />
      </div>
    );
  }
}

const enhance = compose(
  withNamespaces("assessment"),
  connect(state => ({
    item: getQuestionDataSelector(state)
  }))
);

export default enhance(CorrectAnswer);
