import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { CLEAR, EDIT, PREVIEW } from "../../constants/constantsForQuestions";

import EditEssayPlainText from "./components/EditEssayPlainText";
import EssayPlainTextPreview from "./EssayPlainTextPreview";

class EssayPlainText extends PureComponent {
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
        {view === EDIT && <EditEssayPlainText {...this.props} />}
        {view === PREVIEW && <EssayPlainTextPreview {...this.props} />}
      </Fragment>
    );
  }
}

const EssayPlainTextContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(EssayPlainText);

export { EssayPlainTextContainer as EssayPlainText };
