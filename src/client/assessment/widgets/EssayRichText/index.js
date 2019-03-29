import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { CLEAR, EDIT, PREVIEW } from "../../constants/constantsForQuestions";
import { replaceVariables } from "../../utils/variables";

import EditEssayRichText from "./EditEssayRichText";
import EssayRichTextPreview from "./EssayRichTextPreview";

const EssayRichText = props => {
  const { item, view } = props;

  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === EDIT && <EditEssayRichText {...props} />}
      {view === PREVIEW && <EssayRichTextPreview {...props} item={itemForPreview} />}
    </Fragment>
  );
};

EssayRichText.propTypes = {
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

EssayRichText.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const EssayRichTextContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(EssayRichText);

export { EssayRichTextContainer as EssayRichText };
