import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { PREVIEW, EDIT, CLEAR } from "../../constants/constantsForQuestions";

import HotspotPreview from "./HotspotPreview";
import HotspotEdit from "./HotspotEdit";

class Hotspot extends Component {
  render() {
    const { view } = this.props;
    return (
      <Fragment>
        {view === PREVIEW && <HotspotPreview {...this.props} />}
        {view === EDIT && <HotspotEdit {...this.props} />}
      </Fragment>
    );
  }
}

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
