import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { withNamespaces } from "@edulastic/localization";

//actions
import { checkAnswerEvaluation } from "../../actions/checkanswer";

//components

import { Container } from "../common";
import PlayerHeader from "./PlayerHeader";
import PlayerMainContentArea from "./PlayerMainContentArea";

import SubmitConfirmation from "../common/SubmitConfirmation";

import defaultTheme from "../defaultThemeStyle";
import assessmentPlayerTheme from "./themeStyle";

const Theme = {
  ...defaultTheme,
  ...assessmentPlayerTheme
};

class AssessmentPlayerSimple extends React.Component {
  static propTypes = {
    theme: PropTypes.object,
    isLast: PropTypes.func.isRequired,
    isFirst: PropTypes.func.isRequired,
    moveToNext: PropTypes.func.isRequired,
    moveToPrev: PropTypes.func.isRequired,
    gotoQuestion: PropTypes.func.isRequired,
    currentItem: PropTypes.any.isRequired,
    items: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    evaluate: PropTypes.any.isRequired,
    checkAnswer: PropTypes.func.isRequired,
    itemRows: PropTypes.any.isRequired,
    view: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    theme: Theme,
    itemRows: []
  };

  state = {
    showExitPopup: false
  };

  onCheckAnswer = () => {
    const { checkAnswer } = this.props;
    checkAnswer();
  };

  openExitPopup = () => {
    this.setState({ showExitPopup: true });
  };

  hideExitPopup = () => {
    this.setState({ showExitPopup: false });
  };

  finishTest = () => {
    const { history } = this.props;
    history.push("/home/assignments");
  };

  render() {
    const { theme, t, items, currentItem, view: previewTab, questions } = this.props;
    const { showExitPopup } = this.state;
    const dropdownOptions = Array.isArray(items) ? items.map((item, index) => index) : [];

    const item = items[currentItem];
    if (!item) {
      return <div />;
    }
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <PlayerHeader {...this.props} dropdownOptions={dropdownOptions} onOpenExitPopup={this.openExitPopup} t={t} />
          <PlayerMainContentArea
            {...this.props}
            previewTab={previewTab}
            dropdownOptions={dropdownOptions}
            onCheckAnswer={this.onCheckAnswer}
            t={t}
            questions={questions}
          />
          <SubmitConfirmation isVisible={showExitPopup} onClose={this.hideExitPopup} finishTest={this.finishTest} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default connect(
  state => ({
    evaluation: state.evluation,
    preview: state.view.preview,
    questions: state.assessmentplayerQuestions.byId
  }),
  {
    checkAnswer: checkAnswerEvaluation
  }
)(withNamespaces("common")(AssessmentPlayerSimple));
