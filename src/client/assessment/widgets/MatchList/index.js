import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";

import { replaceVariables } from "../../utils/variables";
import { PREVIEW, EDIT, CLEAR } from "../../constants/constantsForQuestions";

import MatchListPreview from "./MatchListPreview";
import MatchListEdit from "./MatchListEdit";

const MatchList = props => {
  const { item, view } = props;
  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === PREVIEW && <MatchListPreview {...props} item={itemForPreview} />}
      {view === EDIT && <MatchListEdit {...props} />}
    </Fragment>
  );
};

MatchList.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

MatchList.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

export { MatchList };
