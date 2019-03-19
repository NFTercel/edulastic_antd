import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { isEmpty } from "lodash";

import { withNamespaces } from "@edulastic/localization";

import { Container } from "../common";
import SubmitConfirmation from "../common/SubmitConfirmation";
import PlayerHeader from "../AssessmentPlayerSimple/PlayerHeader";
import defaultTheme from "../defaultThemeStyle";
import assessmentPlayerTheme from "../AssessmentPlayerSimple/themeStyle";
import Worksheet from "../../../author/AssessmentPage/components/Worksheet/Worksheet";
import { changeViewAction } from "../../../author/src/actions/view";
import { testLoadingSelector } from "../../selectors/test";

const Theme = {
  ...defaultTheme,
  ...assessmentPlayerTheme
};

class AssessmentPlayerDocBased extends React.Component {
  static propTypes = {
    docUrl: PropTypes.string,
    annotations: PropTypes.array,
    theme: PropTypes.object,
    history: PropTypes.object.isRequired,
    changeView: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    questionsById: PropTypes.object.isRequired,
    answers: PropTypes.array.isRequired,
    saveProgress: PropTypes.func.isRequired,
    answersById: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    gotoSummary: PropTypes.func.isRequired
  };

  static defaultProps = {
    docUrl: "",
    annotations: [],
    theme: Theme
  };

  state = {
    showExitPopup: false
  };

  componentDidMount() {
    const { changeView } = this.props;
    changeView("review");
  }

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

  handlePause = () => {
    this.handleSaveProgress();
    this.finishTest();
  };

  handleSaveProgress = () => {
    const { saveProgress } = this.props;
    saveProgress();
  };

  render() {
    const { showExitPopup } = this.state;
    const {
      theme,
      items,
      t,
      docUrl,
      annotations,
      questionsById,
      answers,
      answersById,
      loading,
      gotoSummary
    } = this.props;

    const dropdownOptions = items[0].data.questions.map((item, index) => index);
    const currentItem = answers.filter(answer => !isEmpty(answer)).length - 1;
    const showSubmit = currentItem === dropdownOptions.length - 1;

    return (
      <ThemeProvider theme={theme}>
        <Container style={{ paddingTop: "80px" }}>
          <PlayerHeader
            {...this.props}
            dropdownOptions={dropdownOptions}
            onOpenExitPopup={this.openExitPopup}
            currentItem={currentItem}
            onPause={this.handlePause}
            onSaveProgress={this.handleSaveProgress}
            onSubmit={gotoSummary}
            showSubmit={showSubmit}
            t={t}
          />
          {!loading && (
            <Worksheet
              docUrl={docUrl}
              annotations={annotations}
              questions={items[0].data.questions}
              questionsById={questionsById}
              answersById={answersById}
              review
              noCheck
            />
          )}
          <SubmitConfirmation isVisible={showExitPopup} onClose={this.hideExitPopup} finishTest={this.finishTest} />
        </Container>
      </ThemeProvider>
    );
  }
}

const enhance = compose(
  withNamespaces("common"),
  connect(
    state => ({
      loading: testLoadingSelector(state)
    }),
    {
      changeView: changeViewAction
    }
  )
);

export default enhance(AssessmentPlayerDocBased);
