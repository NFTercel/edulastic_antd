import React, { Component } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";
import { Header, PointField } from "./styled_components";
import { GraphDisplay } from "../Display";

class CorrectAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responseScore: props.response && props.response.score
    };
  }

  updateScore = e => {
    const { onUpdatePoints } = this.props;
    if (e.target.value < 0) e.target.value = 0;
    this.setState({ responseScore: e.target.value });
    onUpdatePoints(parseFloat(e.target.value, 10));
  };

  setResponseValue = val => {
    const { onUpdateValidationValue } = this.props;
    onUpdateValidationValue(val);
  };

  render() {
    const { t, response, graphData } = this.props;
    const { responseScore } = this.state;
    return (
      <div>
        <Header>
          <PointField
            type="number"
            value={responseScore}
            onChange={this.updateScore}
            onBlur={this.updateScore}
            disabled={false}
            min={0}
            step={0.5}
          />
          <span>{t("component.correctanswers.points")}</span>
        </Header>
        <GraphDisplay graphData={graphData} elements={response.value} onChange={this.setResponseValue} />
      </div>
    );
  }
}

CorrectAnswer.propTypes = {
  graphData: PropTypes.object.isRequired,
  onUpdatePoints: PropTypes.func.isRequired,
  onUpdateValidationValue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  response: PropTypes.object.isRequired
};

export default withNamespaces("assessment")(CorrectAnswer);
