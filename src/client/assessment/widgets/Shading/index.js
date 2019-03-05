import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PREVIEW, EDIT, CLEAR } from "../../constants/constantsForQuestions";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import ShadingPreview from "./ShadingPreview";
import ShadingEdit from "./ShadingEdit";

class Shading extends Component {
  render() {
    const { view } = this.props;
    return (
      <Fragment>
        {view === PREVIEW && <ShadingPreview {...this.props} />}
        {view === EDIT && <ShadingEdit {...this.props} />}
      </Fragment>
    );
  }
}

Shading.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

Shading.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const ShadingContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(Shading);

export { ShadingContainer as Shading };
