import React, { useMemo, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { CLEAR, EDIT, PREVIEW } from "../../constants/constantsForQuestions";
import { replaceVariables } from "../../utils/variables";
import EditShortText from "./EditShortText";
import ShortTextPreview from "./ShortTextPreview";

const ShortText = props => {
  const { item, view } = props;
  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === EDIT && <EditShortText {...props} />}
      {view === PREVIEW && <ShortTextPreview {...props} item={itemForPreview} />}
    </Fragment>
  );
};

ShortText.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  setQuestionData: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

ShortText.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const ShortTextContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(ShortText);

export { ShortTextContainer as ShortText };
