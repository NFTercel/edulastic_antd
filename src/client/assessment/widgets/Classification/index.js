import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { EDIT, PREVIEW, CLEAR } from "../../constants/constantsForQuestions";

import EditClassification from "./EditClassification";
import ClassificationPreview from "./ClassificationPreview";

const Classification = props => {
  const { view } = props;

  return (
    <Fragment>
      {view === EDIT && <EditClassification {...props} />}
      {view === PREVIEW && <ClassificationPreview {...props} />}
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
