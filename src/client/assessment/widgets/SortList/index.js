import React, { useMemo, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { CLEAR, EDIT, PREVIEW } from "../../constants/constantsForQuestions";
import { replaceVariables } from "../../utils/variables";

import SortListPreview from "./SortListPreview";
import EditSortList from "./EditSortList";

const SortList = props => {
  const { item, view } = props;
  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === EDIT && <EditSortList {...props} />}
      {view === PREVIEW && <SortListPreview {...props} item={itemForPreview} />}
    </Fragment>
  );
};

SortList.propTypes = {
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

SortList.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const SortListContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(SortList);

export { SortListContainer as SortList };
