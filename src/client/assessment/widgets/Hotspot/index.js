import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { replaceVariables } from "../../utils/variables";

import { PREVIEW, EDIT, CLEAR } from "../../constants/constantsForQuestions";

import HotspotPreview from "./HotspotPreview";
import HotspotEdit from "./HotspotEdit";

const Hotspot = props => {
  const { item, view } = props;
  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === PREVIEW && <HotspotPreview {...props} item={itemForPreview} />}
      {view === EDIT && <HotspotEdit {...props} />}
    </Fragment>
  );
};

Hotspot.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

Hotspot.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const HotspotContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(Hotspot);

export { HotspotContainer as Hotspot };
