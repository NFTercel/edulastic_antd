import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Affix } from "antd";
import { last } from "lodash";
import { withWindowSizes } from "@edulastic/common";
import { IconSend } from "@edulastic/icons";
import QuestionSelectDropdown from "../common/QuestionSelectDropdown";
import MainWrapper from "./MainWrapper";
import HeaderLeftMenu from "../common/HeaderLeftMenu";
import HeaderMainMenu from "../common/HeaderMainMenu";
import HeaderRightMenu from "../common/HeaderRightMenu";
import ToolbarModal from "../common/ToolbarModal";
import SavePauseModalMobile from "../common/SavePauseModalMobile";
import SubmitConfirmation from "../common/SubmitConfirmation";

import {
  ControlBtn,
  ToolButton,
  Main,
  Header,
  Container,
  FlexContainer,
  LogoCompact,
  TestButton,
  ToolBar,
  Clock,
  SaveAndExit,
  SavePauseMobile,
  CalculatorContainer
} from "../common";
import TestItemPreview from "../../components/TestItemPreview";
import {
  LARGE_DESKTOP_WIDTH,
  MEDIUM_DESKTOP_WIDTH,
  IPAD_PORTRAIT_WIDTH,
  MAX_MOBILE_WIDTH
} from "../../constants/others";
import { checkAnswerAction } from "../../../author/src/actions/testItem";
import { changePreviewAction } from "../../../author/src/actions/view";
import SvgDraw from "./SvgDraw";
import Tools from "./Tools";
import { saveScratchPadAction } from "../../actions/userWork";

/* eslint import/no-webpack-loader-syntax: off */
// eslint-disable-next-line
const defaultTheme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../styles/vars.scss');

class AssessmentPlayerDefault extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "#ff0000",
      fillColor: "#ff0000",
      activeMode: "",
      lineWidth: 6,
      scratchPadMode: false,
      cloneCurrentItem: props.currentItem,
      deleteMode: false,
      testItemState: "",
      isToolbarModalVisible: false,
      isSubmitConfirmationVisible: false,
      isSavePauseModalVisible: false,
      history: props.scratchPad ? [props.scratchPad] : [{ points: [], pathes: [], figures: [], texts: [] }],
      currentTab: 0,
      calculateMode: 0,
      changeMode: 0
    };
  }

  static propTypes = {
    theme: PropTypes.object,
    scratchPad: PropTypes.any.isRequired,
    isFirst: PropTypes.func.isRequired,
    isLast: PropTypes.func.isRequired,
    moveToNext: PropTypes.func.isRequired,
    moveToPrev: PropTypes.func.isRequired,
    currentItem: PropTypes.any.isRequired,
    items: PropTypes.any.isRequired,
    gotoQuestion: PropTypes.any.isRequired,
    itemRows: PropTypes.array.isRequired,
    evaluation: PropTypes.any.isRequired,
    checkAnswer: PropTypes.func.isRequired,
    changePreview: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
    windowWidth: PropTypes.number.isRequired,
    questions: PropTypes.object.isRequired
  };

  static defaultProps = {
    theme: defaultTheme
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentItem !== prevState.cloneCurrentItem) {
      nextProps.saveScratchPad({
        [nextProps.items[prevState.cloneCurrentItem]._id]: prevState.history[prevState.currentTab]
      });
      return {
        history: nextProps.scratchPad ? [nextProps.scratchPad] : [{ points: [], pathes: [], figures: [], texts: [] }],
        currentTab: 0,
        cloneCurrentItem: nextProps.currentItem
      };
    }
    return null;
  }

  changeTabItemState = value => {
    const { checkAnswer, changePreview } = this.props;
    checkAnswer();

    changePreview(value);
    this.setState({ testItemState: value });
  };

  closeToolbarModal = () => {
    this.setState({ isToolbarModalVisible: false });
  };

  closeSavePauseModal = () => {
    this.setState({ isSavePauseModalVisible: false });
  };

  openSavePauseModal = () => {
    this.setState({ isSavePauseModalVisible: true });
  };

  openSubmitConfirmation = () => {
    this.setState({ isSubmitConfirmationVisible: true });
  };

  closeSubmitConfirmation = () => {
    this.setState({ isSubmitConfirmationVisible: false });
  };

  finishTest = () => {
    const { history } = this.props;
    history.push("/home/assignments");
  };

  hexToRGB = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);

    const g = parseInt(hex.slice(3, 5), 16);

    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  onFillColorChange = obj => {
    this.setState({
      fillColor: this.hexToRGB(obj.color, (obj.alpha ? obj.alpha : 1) / 100)
    });
  };

  handleModeChange = (flag, value) => {
    this.setState({
      scratchPadMode: flag,
      changeMode: value
    });
  };

  handleModeCaculate = calculateMode => {
    this.setState({
      calculateMode: calculateMode,
      scratchPadMode: false
    });
  };

  handleToolChange = value => () => {
    const { activeMode } = this.state;

    if (value === "deleteMode") {
      this.setState(prevState => ({ deleteMode: !prevState.deleteMode }));
    } else if (activeMode === value) {
      this.setState({ activeMode: "" });
    } else {
      this.setState({ activeMode: value });
    }
  };

  handleColorChange = obj => {
    this.setState({
      currentColor: this.hexToRGB(obj.color, (obj.alpha ? obj.alpha : 1) / 100)
    });
  };

  saveHistory = data => {
    const { history, currentTab } = this.state;
    const { saveScratchPad, items, currentItem } = this.props;
    const newHist = history.slice(0, currentTab + 1);

    newHist.push(data);

    this.setState({ history: newHist, currentTab: currentTab + 1 });
    saveScratchPad({
      [items[currentItem]._id]: last(history)
    });
  };

  handleUndo = () => {
    const { currentTab } = this.state;
    if (currentTab > 0) {
      this.setState({ currentTab: currentTab - 1 });
    }
  };

  handleRedo = () => {
    const { history, currentTab } = this.state;
    if (currentTab < history.length - 1) {
      this.setState({ currentTab: currentTab + 1 });
    }
  };

  render() {
    const {
      theme,
      items,
      isFirst,
      isLast,
      moveToNext,
      moveToPrev,
      gotoQuestion,
      currentItem,
      itemRows,
      evaluation,
      windowWidth,
      questions
    } = this.props;

    const {
      testItemState,
      isToolbarModalVisible,
      isSubmitConfirmationVisible,
      isSavePauseModalVisible,
      scratchPadMode,
      activeMode,
      currentColor,
      deleteMode,
      history,
      currentTab,
      lineWidth,
      fillColor,
      changeMode,
      calculateMode
    } = this.state;

    const dropdownOptions = Array.isArray(items) ? items.map((item, index) => index) : [];

    const item = items[currentItem];
    if (!item) {
      return <div />;
    }
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <SvgDraw
            activeMode={activeMode}
            scratchPadMode={scratchPadMode}
            lineColor={currentColor}
            deleteMode={deleteMode}
            lineWidth={lineWidth}
            fillColor={fillColor}
            saveHistory={this.saveHistory}
            history={history[currentTab]}
          />
          {scratchPadMode && (
            <Tools
              onFillColorChange={this.onFillColorChange}
              fillColor={fillColor}
              deleteMode={deleteMode}
              currentColor={currentColor}
              onToolChange={this.handleToolChange}
              activeMode={activeMode}
              undo={this.handleUndo}
              redo={this.handleRedo}
              onColorChange={this.handleColorChange}
            />
          )}
          <ToolbarModal
            isVisible={isToolbarModalVisible}
            onClose={() => this.closeToolbarModal()}
            checkanswer={() => this.changeTabItemState("check")}
          />
          <SavePauseModalMobile
            isVisible={isSavePauseModalVisible}
            onClose={this.closeSavePauseModal}
            onExitClick={this.openSubmitConfirmation}
          />
          <SubmitConfirmation
            isVisible={isSubmitConfirmationVisible}
            onClose={() => this.closeSubmitConfirmation()}
            finishTest={this.finishTest}
          />
          <Affix>
            <Header>
              <HeaderLeftMenu>
                <LogoCompact />
                {windowWidth <= IPAD_PORTRAIT_WIDTH && (
                  <Fragment>
                    <Clock />
                    <SavePauseMobile openSavePauseModal={this.openSavePauseModal} isVisible={isSavePauseModalVisible} />
                  </Fragment>
                )}
              </HeaderLeftMenu>
              <HeaderMainMenu skin>
                <FlexContainer
                  style={{
                    justifyContent: windowWidth <= IPAD_PORTRAIT_WIDTH && "space-between"
                  }}
                >
                  <QuestionSelectDropdown
                    key={currentItem}
                    currentItem={currentItem}
                    gotoQuestion={gotoQuestion}
                    options={dropdownOptions}
                  />

                  <FlexContainer
                    style={{
                      flex: 1,
                      justifyContent: windowWidth <= IPAD_PORTRAIT_WIDTH && "flex-end"
                    }}
                  >
                    <ControlBtn
                      prev
                      skin
                      data-cy="prev"
                      type="primary"
                      icon="left"
                      disabled={isFirst()}
                      onClick={moveToPrev}
                    />
                    <ControlBtn
                      next
                      skin
                      type="primary"
                      data-cy="next"
                      icon={!isLast() && "right"}
                      onClick={moveToNext}
                    >
                      {isLast() && <IconSend />}
                    </ControlBtn>
                    {windowWidth < LARGE_DESKTOP_WIDTH && (
                      <ToolButton
                        next
                        skin
                        size="large"
                        type="primary"
                        icon="tool"
                        data-cy="setting"
                        onClick={() => {
                          this.setState({ isToolbarModalVisible: true });
                        }}
                      />
                    )}
                    {windowWidth >= MEDIUM_DESKTOP_WIDTH && (
                      <TestButton checkAnwser={() => this.changeTabItemState("check")} />
                    )}
                    {windowWidth >= LARGE_DESKTOP_WIDTH && (
                      <ToolBar changeMode={this.handleModeChange} changeCaculateMode={this.handleModeCaculate} />
                    )}
                    {windowWidth >= MAX_MOBILE_WIDTH && <Clock />}
                    {windowWidth >= MAX_MOBILE_WIDTH && (
                      <SaveAndExit finishTest={() => this.openSubmitConfirmation()} />
                    )}
                  </FlexContainer>
                </FlexContainer>
                <FlexContainer />
              </HeaderMainMenu>
              <HeaderRightMenu skin />
            </Header>
          </Affix>
          <Main skin>
            <MainWrapper>
              {testItemState === "" && <TestItemPreview cols={itemRows} questions={questions} />}
              {testItemState === "check" && (
                <TestItemPreview
                  cols={itemRows}
                  previewTab="check"
                  evaluation={evaluation}
                  verticalDivider={item.verticalDivider}
                  scrolling={item.scrolling}
                  questions={questions}
                />
              )}
            </MainWrapper>
          </Main>
          <CalculatorContainer changeMode={changeMode} calculateMode={calculateMode} />
        </Container>
      </ThemeProvider>
    );
  }
}

const enhance = compose(
  withRouter,
  withWindowSizes,
  connect(
    (state, ownProps) => ({
      evaluation: state.evaluation,
      preview: state.view.preview,
      questions: state.assessmentplayerQuestions.byId,
      scratchPad: ownProps.items[ownProps.currentItem]
        ? state.userWork[ownProps.items[ownProps.currentItem]._id] || null
        : null
    }),
    {
      checkAnswer: checkAnswerAction,
      changePreview: changePreviewAction,
      saveScratchPad: saveScratchPadAction
    }
  )
);

export default enhance(AssessmentPlayerDefault);
