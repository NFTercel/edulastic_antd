import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { replaceVariables } from "../../utils/variables";

import { CLEAR, EDIT, PREVIEW } from "../../constants/constantsForQuestions";

import EditEssayPlainText from "./components/EditEssayPlainText";
import EssayPlainTextPreview from "./EssayPlainTextPreview";

const EssayPlainText = props => {
  const { item, view } = props;

  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === EDIT && <EditEssayPlainText {...props} />}
      {view === PREVIEW && <EssayPlainTextPreview {...props} item={itemForPreview} />}
    </Fragment>
  );
};

EssayPlainText.propTypes = {
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

EssayPlainText.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const EssayPlainTextContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(EssayPlainText);

export { EssayPlainTextContainer as EssayPlainText };
