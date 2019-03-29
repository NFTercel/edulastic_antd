import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { PREVIEW, EDIT, CLEAR } from "../../constants/constantsForQuestions";
import { replaceVariables } from "../../utils/variables";

import TokenHighlightPreview from "./TokenHighlightPreview";
import TokenHighlightEdit from "./TokenHighlightEdit";

const TokenHighlight = props => {
  const { item, view } = props;
  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === PREVIEW && <TokenHighlightPreview {...props} item={itemForPreview} />}
      {view === EDIT && <TokenHighlightEdit {...props} />}
    </Fragment>
  );
};

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
