import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { cloneDeep } from "lodash";

import { Checkbox, Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { CorrectAnswerOptions } from "../../styled/CorrectAnswerOptions";

import { EditorContainer } from "./styled/EditorContainer";
import { OptionsContainer } from "./styled/OptionsContainer";
import Options from "./components/Options";
import Display from "./Display";
import Authoring from "./Authoring";
import CorrectAnswers from "./CorrectAnswers";

class ClozeImageText extends Component {
  state = {
    duplicatedResponses: false,
    shuffleOptions: false,
    showDraghandle: false,
    transparentResponses: false
  };

  getRenderData = () => {
    const { item, history } = this.props;
    const locationState = history.location.state;
    const isDetailPage = locationState !== undefined ? locationState.itemDetail : false;
    const previewDisplayOptions = item.options;
    let previewStimulus;
    let itemForEdit;
    if (isDetailPage) {
      previewStimulus = item.stimulus;
      itemForEdit = item;
    } else {
      previewStimulus = item.stimulus;
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
      uiStyle: item.ui_style
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

  handleOptionsChange = (name, value) => {
    const { setQuestionData, item } = this.props;
    const newItem = cloneDeep(item);
    newItem[name] = value;
    setQuestionData(newItem);
    switch (name) {
      case "duplicated_responses": {
        this.setState({ duplicatedResponses: value });
        break;
      }
      case "shuffle_options": {
        this.setState({ shuffleOptions: value });
        break;
      }
      case "show_draghandle": {
        this.setState({ showDraghandle: value });
        break;
      }
      case "transparent_responses": {
        this.setState({ transparentResponses: value });
        break;
      }
      default:
    }
  };

  handleAddAnswer = userAnswer => {
    const { saveAnswer } = this.props;
    const newAnswer = cloneDeep(userAnswer);
    saveAnswer(newAnswer);
  };

  render() {
    const { qIndex, view, previewTab, item, userAnswer, t, testItem, evaluation } = this.props;
    const { previewStimulus, previewDisplayOptions, itemForEdit, uiStyle } = this.getRenderData();
    const { duplicatedResponses, showDraghandle, shuffleOptions, transparentResponses } = this.state;

    const Wrapper = testItem ? React.Fragment : Paper;
    return (
      <React.Fragment>
        {view === "edit" && (
          <React.Fragment>
            <EditorContainer top={36} bottom={36} left={60} right={60}>
              <div className="authoring">
                <Authoring item={itemForEdit} />
                <CorrectAnswers
                  key={duplicatedResponses || showDraghandle || shuffleOptions}
                  validation={item.validation}
                  configureOptions={{
                    duplicatedResponses,
                    showDraghandle,
                    shuffleOptions,
                    transparentResponses
                  }}
                  options={previewDisplayOptions}
                  imageAlterText={item.imageAlterText}
                  responses={item.responses}
                  imageUrl={item.imageUrl}
                  imageWidth={item.imageWidth}
                  question={previewStimulus}
                  showDashedBorder={item.responseLayout && item.responseLayout.showdashedborder}
                  uiStyle={uiStyle}
                  backgroundColor={item.background}
                  maxRespCount={item.maxRespCount}
                  onAddAltResponses={this.handleAddAltResponses}
                  onRemoveAltResponses={this.handleRemoveAltResponses}
                />
                <CorrectAnswerOptions>
                  <Checkbox
                    className="additional-options"
                    onChange={() => this.handleOptionsChange("shuffle_options", !shuffleOptions)}
                    label={t("component.cloze.imageText.shuffleoptions")}
                    checked={shuffleOptions}
                  />
                </CorrectAnswerOptions>
              </div>
            </EditorContainer>
            <OptionsContainer>
              <Options
                onChange={this.handleOptionsChange}
                uiStyle={uiStyle}
                outerStyle={{
                  padding: "16px 60px 7px 60px"
                }}
              />
            </OptionsContainer>
          </React.Fragment>
        )}
        {view === "preview" && (
          <Wrapper>
            {previewTab === "check" && (
              <Display
                checkAnswer
                options={previewDisplayOptions}
                question={previewStimulus}
                uiStyle={uiStyle}
                item={item}
                templateMarkUp={item.templateMarkUp}
                userSelections={userAnswer}
                onChange={this.handleAddAnswer}
                configureOptions={{
                  duplicatedResponses,
                  showDraghandle,
                  shuffleOptions,
                  transparentResponses
                }}
                imageAlterText={item.imageAlterText}
                responseContainers={item.responses}
                imageUrl={item.imageUrl}
                imageWidth={item.imageWidth}
                evaluation={evaluation}
                qIndex={qIndex}
              />
            )}
            {previewTab === "show" && (
              <Display
                showAnswer
                options={previewDisplayOptions}
                question={previewStimulus}
                uiStyle={uiStyle}
                item={item}
                templateMarkUp={item.templateMarkUp}
                userSelections={userAnswer}
                validation={item.validation}
                configureOptions={{
                  duplicatedResponses,
                  showDraghandle,
                  shuffleOptions,
                  transparentResponses
                }}
                imageAlterText={item.imageAlterText}
                responseContainers={item.responses}
                imageUrl={item.imageUrl}
                imageWidth={item.imageWidth}
                evaluation={evaluation}
                qIndex={qIndex}
              />
            )}
            {previewTab === "clear" && (
              <Display
                preview
                validation={item.validation}
                configureOptions={{
                  duplicatedResponses,
                  showDraghandle,
                  shuffleOptions,
                  transparentResponses
                }}
                options={previewDisplayOptions}
                imageAlterText={item.imageAlterText}
                responseContainers={item.responses}
                imageUrl={item.imageUrl}
                imageWidth={item.imageWidth}
                question={previewStimulus}
                showDashedBorder={item.responseLayout && item.responseLayout.showdashedborder}
                uiStyle={uiStyle}
                item={item}
                backgroundColor={item.background}
                key={previewDisplayOptions && previewStimulus && uiStyle}
                templateMarkUp={item.templateMarkUp}
                userSelections={userAnswer}
                maxRespCount={item.maxRespCount}
                onChange={this.handleAddAnswer}
                qIndex={qIndex}
              />
            )}
          </Wrapper>
        )}
      </React.Fragment>
    );
  }
}

ClozeImageText.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  item: PropTypes.object,
  history: PropTypes.object,
  setQuestionData: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  qIndex: PropTypes.number.isRequired,
  userAnswer: PropTypes.array,
  t: PropTypes.func.isRequired,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

ClozeImageText.defaultProps = {
  previewTab: "clear",
  item: {
    opttions: []
  },
  history: {},
  userAnswer: [],
  testItem: false,
  evaluation: []
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

const ClozeImageTextContainer = enhance(ClozeImageText);

export { ClozeImageTextContainer as ClozeImageText };
