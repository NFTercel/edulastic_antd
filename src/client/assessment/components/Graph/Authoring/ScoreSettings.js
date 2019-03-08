import React, { Component } from "react";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import PropTypes from "prop-types";
import Scoring from "../../../containers/WidgetOptions/components/Scoring";

const types = [
  { label: "Exact match", value: "exactMatch" },
  { label: "Partial match", value: "partialMatch" },
  { label: "Partial match v2", value: "partialMatchV2" },
  { label: "Contains", value: "contains" },
  { label: "By location", value: "byLocation" },
  { label: "By count", value: "byCount" }
];

class ScoreSettings extends Component {
  render() {
    const { scoringTypes, showSelect } = this.props;
    return <Scoring showSelect={showSelect} scoringTypes={scoringTypes} isSection />;
  }
}

ScoreSettings.propTypes = {
  scoringTypes: PropTypes.array
};

ScoreSettings.defaultProps = {
  scoringTypes: types
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(ScoreSettings);
