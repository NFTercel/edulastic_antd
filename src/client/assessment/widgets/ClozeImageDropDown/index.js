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

import Options from "./components/Options";
import Display from "./Display";
import CorrectAnswers from "./CorrectAnswers";
import Authoring from "./Authoring";
import { OptionsContainer } from "./styled/OptionsContainer";
import { EditorContainer } from "./styled/EditorContainer";

class ClozeImageDropDown extends Component {
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
    if (item.smallSize || isDetailPage) {
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

  handleItemChangeChange = (prop, uiStyle) => {
    const { item, setQuestionData } = this.props;
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  handleValidationChange = (prop, uiStyle) => {
    const { item, setQuestionData } = this.props;
    const newItem = cloneDeep(item);

    newItem.validation[prop] = uiStyle;
    setQuestionData(newItem);
  };

  handleUiStyleChange = (prop, uiStyle) => {
    const { item, setQuestionData } = this.props;
    const newItem = cloneDeep(item);

    newItem.ui_style[prop] = uiStyle;
    setQuestionData(newItem);
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
    const { qIndex, view, previewTab, smallSize, item, userAnswer, t, testItem, evaluation } = this.props;
    const { previewStimulus, previewDisplayOptions, itemForEdit, uiStyle } = this.getRenderData();
    const { duplicatedResponses, showDraghandle, shuffleOptions, transparentResponses } = this.state;

    const Wrapper = testItem ? React.Fragment : Paper;

    const fontSize = item.ui_style ? (item.ui_style.fontsize ? item.ui_style.fontsize : "lol") : "lol";

    const { imagescale } = item;

    return (
      <React.Fragment>
        {view === "edit" && (
          <React.Fragment>
            <EditorContainer top={36} bottom={36} left={60} right={60}>
              <div className="authoring">
                <Authoring fontSize={fontSize} item={itemForEdit} />
                <CorrectAnswers
                  key={duplicatedResponses || showDraghandle || shuffleOptions}
                  validation={item.validation}
                  configureOptions={{
                    duplicatedResponses,
                    showDraghandle,
                    shuffleOptions,
                    transparentResponses
                  }}
                  imagescale={imagescale}
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
                    label={t("component.cloze.imageDropDown.shuffleoptions")}
                    checked={shuffleOptions}
                  />
                </CorrectAnswerOptions>
              </div>
            </EditorContainer>
            <OptionsContainer>
              <Options questionData={item} uiStyle={uiStyle} onChange={this.handleOptionsChange} />
            </OptionsContainer>
          </React.Fragment>
        )}
        {view === "preview" && (
          <Wrapper>
            <Display
              preview={previewTab === "clear"}
              showAnswer={previewTab === "show"}
              checkAnswer={previewTab === "check"}
              validation={item.validation}
              configureOptions={{
                duplicatedResponses,
                showDraghandle,
                shuffleOptions,
                transparentResponses
              }}
              options={previewDisplayOptions}
              imageAlterText={item.imageAlterText}
              imagescale={imagescale}
              responseContainers={item.responses}
              evaluation={evaluation}
              imageUrl={item.imageUrl}
              imageWidth={item.imageWidth}
              question={previewStimulus}
              showDashedBorder={item.responseLayout && item.responseLayout.showdashedborder}
              uiStyle={uiStyle}
              backgroundColor={item.background}
              key={previewDisplayOptions && previewStimulus && uiStyle}
              smallSize={smallSize}
              templateMarkUp={item.templateMarkUp}
              userSelections={userAnswer}
              maxRespCount={item.maxRespCount}
              onChange={this.handleAddAnswer}
              qIndex={qIndex}
            />
          </Wrapper>
        )}
      </React.Fragment>
    );
  }
}

ClozeImageDropDown.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  item: PropTypes.object,
  smallSize: PropTypes.bool,
  history: PropTypes.object,
  setQuestionData: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.array,
  t: PropTypes.func.isRequired,
  testItem: PropTypes.bool,
  evaluation: PropTypes.any
};

ClozeImageDropDown.defaultProps = {
  previewTab: "clear",
  item: {
    options: []
  },
  smallSize: false,
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

const ClozeImageDropDownContainer = enhance(ClozeImageDropDown);

export { ClozeImageDropDownContainer as ClozeImageDropDown };
