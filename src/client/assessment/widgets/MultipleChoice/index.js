import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { cloneDeep, shuffle } from "lodash";
import styled from "styled-components";
import { Checkbox } from "antd";

import { PaddingDiv, Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { PREVIEW, EDIT, CLEAR, CHECK, SHOW } from "../../constants/constantsForQuestions";

import Options from "./components/Options";
import Authoring from "./components/Authoring";
import Display from "./components/Display";
import CorrectAnswers from "./CorrectAnswers";

const EmptyWrapper = styled.div``;

class MultipleChoice extends Component {
  state = {
    shuffledOptions: []
  };

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;

    if (!nextProps.item.shuffle_options) {
      this.setState({
        shuffledOptions: nextProps.item.options
      });
    } else if (nextProps.item.shuffle_options !== item.shuffle_options && nextProps.item.shuffle_options) {
      this.setState({
        shuffledOptions: shuffle(nextProps.item.options)
      });
    }
  }

  componentDidMount() {
    const { item } = this.props;

    this.setState({
      shuffledOptions: shuffle(item.options)
    });
  }

  getRenderData = () => {
    const { item, history } = this.props;
    const locationState = history.location.state;
    const isDetailPage = locationState !== undefined ? locationState.itemDetail : false;
    let previewDisplayOptions;
    let previewStimulus;
    let itemForEdit;
    if (item.smallSize || isDetailPage) {
      previewStimulus = item.stimulus;
      previewDisplayOptions = item.options;
      itemForEdit = item;
    } else {
      previewStimulus = item.stimulus;
      previewDisplayOptions = item.options;
      itemForEdit = {
        ...item,
        stimulus: item.stimulus,
        list: item.options,
        validation: item.validation
      };
    }
    return {
      previewStimulus,
      previewDisplayOptions,
      itemForEdit,
      uiStyle: item.ui_style,
      multipleResponses: !!item.multiple_responses,
      shuffleOptions: !!item.shuffle_options
    };
  };

  handleAddAltResponses = () => {
    const { setQuestionData, item } = this.props;
    const newItem = cloneDeep(item);

    const response = {
      score: 1,
      value: []
    };

    if (newItem.validation.alt_responses && newItem.validation.alt_responses.length) {
      newItem.validation.alt_responses.push(response);
    } else {
      newItem.validation.alt_responses = [response];
    }

    setQuestionData(newItem);
  };

  handleRemoveAltResponses = index => {
    const { setQuestionData, item } = this.props;
    const newItem = cloneDeep(item);

    if (newItem.validation.alt_responses && newItem.validation.alt_responses.length) {
      newItem.validation.alt_responses = newItem.validation.alt_responses.filter((response, i) => i !== index);
    }

    setQuestionData(newItem);
  };

  handleAddAnswer = qid => {
    const { saveAnswer, userAnswer, item } = this.props;
    const newAnswer = cloneDeep(userAnswer);

    if (item.multiple_responses) {
      if (newAnswer.includes(qid)) {
        const removeIndex = newAnswer.findIndex(el => el === qid);
        newAnswer.splice(removeIndex, 1);
        saveAnswer(newAnswer);
      } else {
        saveAnswer([...newAnswer, qid]);
      }
    } else {
      saveAnswer([qid]);
    }
  };

  handleOptionsChange = (name, value) => {
    console.log(name, value);
    const { setQuestionData, item, saveAnswer } = this.props;
    const newItem = cloneDeep(item);
    const reduceResponses = (acc, val, index) => {
      if (index === 0) {
        acc.push(val);
      }
      return acc;
    };

    if (name === "multiple_responses" && value === false) {
      newItem.validation.valid_response.value = newItem.validation.valid_response.value.reduce(reduceResponses, []);
      newItem.validation.alt_responses = newItem.validation.alt_responses.map(res => {
        res.value = res.value.reduce(reduceResponses, []);
        return res;
      });
      saveAnswer([]);
    }

    newItem[name] = value;
    console.log(newItem);
    setQuestionData(newItem);
  };

  render() {
    const { qIndex, view, previewTab, smallSize, item, userAnswer, t, testItem, evaluation } = this.props;
    const { shuffledOptions } = this.state;
    const {
      previewStimulus,
      previewDisplayOptions,
      itemForEdit,
      uiStyle,
      multipleResponses,
      shuffleOptions
    } = this.getRenderData();

    const Wrapper = testItem ? EmptyWrapper : Paper;

    return (
      <React.Fragment>
        <PaddingDiv>
          {view === EDIT && (
            <React.Fragment>
              <Paper style={{ marginBottom: 25 }}>
                <Authoring item={itemForEdit} />
                <CorrectAnswers
                  uiStyle={uiStyle}
                  options={previewDisplayOptions}
                  question={previewStimulus}
                  multipleResponses={multipleResponses}
                  onAddAltResponses={this.handleAddAltResponses}
                  onRemoveAltResponses={this.handleRemoveAltResponses}
                  validation={item.validation}
                />
                <Checkbox
                  data-cy="multi"
                  onChange={() => this.handleOptionsChange("multiple_responses", !multipleResponses)}
                  checked={multipleResponses}
                >
                  {t("component.multiplechoice.multipleResponses")}
                </Checkbox>
                <Checkbox
                  onChange={() => this.handleOptionsChange("shuffle_options", !shuffleOptions)}
                  checked={shuffleOptions}
                >
                  {t("component.multiplechoice.shuffleOptions")}
                </Checkbox>
              </Paper>
              <Options onChange={this.handleOptionsChange} uiStyle={uiStyle} />
            </React.Fragment>
          )}
          {view === PREVIEW && (
            <Wrapper>
              {previewTab === CHECK && (
                <Display
                  checkAnswer
                  data={item}
                  view={view}
                  onChange={this.handleAddAnswer}
                  smallSize={smallSize}
                  userSelections={userAnswer}
                  options={shuffledOptions}
                  question={previewStimulus}
                  handleMultiSelect={this.handleMultiSelect}
                  uiStyle={uiStyle}
                  evaluation={evaluation}
                  qIndex={qIndex}
                  instructorStimulus={item.instructor_stimulus}
                />
              )}
              {previewTab === SHOW && (
                <Display
                  showAnswer
                  view={view}
                  smallSize={smallSize}
                  options={shuffledOptions}
                  question={previewStimulus}
                  userSelections={userAnswer}
                  handleMultiSelect={this.handleMultiSelect}
                  uiStyle={uiStyle}
                  evaluation={evaluation}
                  validation={item.validation}
                  qIndex={qIndex}
                  instructorStimulus={item.instructor_stimulus}
                />
              )}
              {previewTab === CLEAR && (
                <Display
                  preview
                  view={view}
                  smallSize={smallSize}
                  options={shuffledOptions}
                  question={previewStimulus}
                  data={item}
                  validation={item.validation}
                  userSelections={userAnswer}
                  onChange={this.handleAddAnswer}
                  uiStyle={uiStyle}
                  qIndex={qIndex}
                  instructorStimulus={item.instructor_stimulus}
                />
              )}
            </Wrapper>
          )}
        </PaddingDiv>
      </React.Fragment>
    );
  }
}

MultipleChoice.propTypes = {
  view: PropTypes.string.isRequired,
  qIndex: PropTypes.number.isRequired,
  previewTab: PropTypes.string,
  item: PropTypes.object,
  smallSize: PropTypes.bool,
  history: PropTypes.object,
  setQuestionData: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  t: PropTypes.func.isRequired,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

MultipleChoice.defaultProps = {
  previewTab: CLEAR,
  item: {
    options: []
  },
  smallSize: false,
  history: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const enhance = compose(
  withRouter,
  withNamespaces("assessment"),
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

const MultipleChoiceContainer = enhance(MultipleChoice);

export { MultipleChoiceContainer as MultipleChoice };
