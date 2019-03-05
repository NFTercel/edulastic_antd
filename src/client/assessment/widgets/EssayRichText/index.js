import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { CLEAR, EDIT, PREVIEW } from "../../constants/constantsForQuestions";

import EditEssayRichText from "./EditEssayRichText";
import EssayRichTextPreview from "./EssayRichTextPreview";

class EssayRichText extends PureComponent {
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
        {view === EDIT && <EditEssayRichText {...this.props} />}
        {view === PREVIEW && <EssayRichTextPreview {...this.props} />}
      </Fragment>
    );
  }
}

const EssayRichTextContainer = connect(
  null,
  { setQuestionData: setQuestionDataAction }
)(EssayRichText);

export { EssayRichTextContainer as EssayRichText };
