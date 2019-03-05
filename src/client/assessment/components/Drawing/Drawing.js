import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DrawingPreview from "./DrawingPreview";
import DrawingEdit from "./DrawingEdit";
import { PREVIEW, EDIT, CLEAR } from "../../constants/constantsForQuestions";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

const Drawing = props => {
  const { view } = props;
  return (
    <Fragment>
      {view === PREVIEW && <DrawingPreview {...props} />}
      {view === EDIT && <DrawingEdit {...props} />}
    </Fragment>
  );
};

Drawing.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

Drawing.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

export default connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(Drawing);
