import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { PREVIEW, EDIT, CLEAR } from "../../constants/constantsForQuestions";

import HighlightImagePreview from "./HighlightImagePreview";
import HighlightImageEdit from "./components/HighlightImageEdit";

class HighlightImage extends Component {
  render() {
    const { view } = this.props;
    return (
      <Fragment>
        {view === PREVIEW && <HighlightImagePreview {...this.props} />}
        {view === EDIT && <HighlightImageEdit {...this.props} />}
      </Fragment>
    );
  }
}

HighlightImage.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

HighlightImage.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const HighlightImageContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(HighlightImage);

export { HighlightImageContainer as HighlightImage };
