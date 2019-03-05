import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { PREVIEW, EDIT, CLEAR } from "../../constants/constantsForQuestions";

import TokenHighlightPreview from "./TokenHighlightPreview";
import TokenHighlightEdit from "./TokenHighlightEdit";

class TokenHighlight extends Component {
  render() {
    const { view } = this.props;
    return (
      <Fragment>
        {view === PREVIEW && <TokenHighlightPreview {...this.props} />}
        {view === EDIT && <TokenHighlightEdit {...this.props} />}
      </Fragment>
    );
  }
}

TokenHighlight.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

TokenHighlight.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const TokenHighlightContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(TokenHighlight);

export { TokenHighlightContainer as TokenHighlight };
