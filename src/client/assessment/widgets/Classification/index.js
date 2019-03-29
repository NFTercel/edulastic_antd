import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";

import { EDIT, PREVIEW, CLEAR } from "../../constants/constantsForQuestions";
import { replaceVariables } from "../../utils/variables";

import EditClassification from "./EditClassification";
import ClassificationPreview from "./ClassificationPreview";

const Classification = props => {
  const { view, item } = props;
  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === EDIT && <EditClassification {...props} />}
      {view === PREVIEW && <ClassificationPreview {...props} item={itemForPreview} />}
    </Fragment>
  );
};

Classification.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

Classification.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

export { Classification };
