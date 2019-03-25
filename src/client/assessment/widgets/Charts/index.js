import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { PREVIEW, EDIT, CLEAR } from "../../constants/constantsForQuestions";

import ChartPreview from "./ChartPreview";
import ChartEdit from "./ChartEdit";

class Chart extends Component {
  render() {
    const { view } = this.props;
    return (
      <Fragment>
        {view === PREVIEW && <ChartPreview {...this.props} />}
        {view === EDIT && <ChartEdit {...this.props} />}
      </Fragment>
    );
  }
}

Chart.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

Chart.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const ChartContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(Chart);

export { ChartContainer as Chart };
