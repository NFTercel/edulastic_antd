import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from '../../../author/QuestionEditor/ducks';
import { CLEAR, EDIT, PREVIEW } from "../../constants/constantsForQuestions";

import EditShortText from "./EditShortText";
import ShortTextPreview from "./ShortTextPreview";

class ShortText extends PureComponent {
  static propTypes = {
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

  static defaultProps = {
    previewTab: CLEAR,
    smallSize: false,
    item: {},
    userAnswer: [],
    testItem: false,
    evaluation: ""
  };

  render() {
    const { view } = this.props;

    return (
      <Fragment>
        {view === EDIT && <EditShortText {...this.props} />}
        {view === PREVIEW && <ShortTextPreview {...this.props} />}
      </Fragment>
    );
  }
}

const ShortTextContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(ShortText);

export { ShortTextContainer as ShortText };
