import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { cloneDeep } from "lodash";
import styled, { withTheme } from "styled-components";
import { Checkbox } from "antd";
import { AdaptiveCloze } from "../ClozeDropDown/styled/AdaptiveCloze";

import { withNamespaces } from "@edulastic/localization";
import { Paper } from "@edulastic/common";

import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { CorrectAnswerOptions } from "../../styled/CorrectAnswerOptions";

import Options from "./components/Options";
import CorrectAnswers from "./CorrectAnswers";
import Display from "./Display";
import Authoring from "./Authoring";

const EmptyWrapper = styled.div``;

class ClozeImageDragDrop extends Component {
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

  handleOptionsChange = (name, value) => {
    const { setQuestionData, item } = this.props;
    const newItem = cloneDeep(item);
    newItem[name] = value;
    setQuestionData(newItem);
    switch (name) {
      case 'duplicated_responses': {
        this.setState({ duplicatedResponses: value });
        break;
      }
      case 'shuffle_options': {
        this.setState({ shuffleOptions: value });
        break;
      }
      case 'show_draghandle': {
        this.setState({ showDraghandle: value });
        break;
      }
      case 'transparent_responses': {
        this.setState({ transparentResponses: value });
        break;
      }
      default:
    }
  };

  handleAddAnswer = (userAnswer) => {
    const { saveAnswer } = this.props;
    const newAnswer = cloneDeep(userAnswer);
    saveAnswer(newAnswer);
  };

  render() {
    const {
      view,
      previewTab,
      smallSize,
      item,
      userAnswer,
      t,
      testItem,
      evaluation,
      theme
    } = this.props;
    const { previewStimulus, previewDisplayOptions, itemForEdit, uiStyle } = this.getRenderData();
    const {
      duplicatedResponses,
      showDraghandle,
      shuffleOptions,
      transparentResponses
    } = this.state;

    const Wrapper = testItem ? EmptyWrapper : Paper;
    return (
      <div>
        {view === 'edit' && (
          <React.Fragment>
            <AdaptiveCloze
              background={theme.widgets.clozeImageDragDrop.editViewBgColor}
            >
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
                />
                <CorrectAnswerOptions>
                  <Checkbox
                    data-cy="multi-check"
                    className="additional-options"
                    onChange={() =>
                      this.handleOptionsChange('duplicated_responses', !duplicatedResponses)
                    }
                    defaultChecked={duplicatedResponses}
                  >
                    {t('component.cloze.imageDragDrop.duplicatedresponses')}
                  </Checkbox>
                  <Checkbox
                    data-cy="drag-check"
                    className="additional-options"
                    onChange={() => this.handleOptionsChange('show_draghandle', !showDraghandle)}
                    defaultChecked={showDraghandle}
                  >
                    {t('component.cloze.imageDragDrop.showdraghandle')}
                  </Checkbox>
                  <Checkbox
                    data-cy="shuffle-check"
                    className="additional-options"
                    onChange={() => this.handleOptionsChange('shuffle_options', !shuffleOptions)}
                    defaultChecked={shuffleOptions}
                  >
                    {t('component.cloze.imageDragDrop.shuffleoptions')}
                  </Checkbox>
                  <Checkbox
                    data-cy="transparent-check"
                    className="additional-options"
                    onChange={() =>
                      this.handleOptionsChange('transparent_responses', !transparentResponses)
                    }
                    defaultChecked={transparentResponses}
                  >
                    {t('component.cloze.imageDragDrop.transparentpossibleresponses')}
                  </Checkbox>
                </CorrectAnswerOptions>
              </div>
            </AdaptiveCloze>
            <div style={{ marginTop: 35 }}>
              <Options
                onChange={this.handleOptionsChange}
                uiStyle={uiStyle}
                outerStyle={{
                  padding: '30px 120px'
                }}
              />
            </div>
          </React.Fragment>
        )}
        {view === 'preview' && (
          <Wrapper>
            {previewTab === 'check' && (
              <Display
                checkAnswer
                item={item}
                options={previewDisplayOptions}
                instructorStimulus={item.instructor_stimulus}
                question={previewStimulus}
                uiStyle={uiStyle}
                templateMarkUp={item.templateMarkUp}
                userAnswer={userAnswer}
                userSelections={userAnswer}
                onChange={this.handleAddAnswer}
                maxRespCount={item.maxRespCount}
                showDashedBorder={item.responseLayout && item.responseLayout.showdashedborder}
                configureOptions={{
                  duplicatedResponses,
                  showDraghandle,
                  shuffleOptions,
                  transparentResponses
                }}
                imageAlterText={item.imageAlterText}
                imageTitle={item.imageTitle}
                responseContainers={item.responses}
                imageUrl={item.imageUrl}
                imageWidth={item.imageWidth}
                evaluation={evaluation}
              />
            )}
            {previewTab === 'show' && (
              <Display
                showAnswer
                item={item}
                instructorStimulus={item.instructor_stimulus}
                options={previewDisplayOptions}
                question={previewStimulus}
                uiStyle={uiStyle}
                templateMarkUp={item.templateMarkUp}
                maxRespCount={item.maxRespCount}
                userAnswer={userAnswer}
                userSelections={userAnswer}
                validation={item.validation}
                showDashedBorder={item.responseLayout && item.responseLayout.showdashedborder}
                configureOptions={{
                  duplicatedResponses,
                  showDraghandle,
                  shuffleOptions,
                  transparentResponses
                }}
                imageAlterText={item.imageAlterText}
                imageTitle={item.imageTitle}
                responseContainers={item.responses}
                imageUrl={item.imageUrl}
                imageWidth={item.imageWidth}
                evaluation={evaluation}
              />
            )}
            {previewTab === 'clear' && (
              <Display
                preview
                item={item}
                instructorStimulus={item.instructor_stimulus}
                validation={item.validation}
                configureOptions={{
                  duplicatedResponses,
                  showDraghandle,
                  shuffleOptions,
                  transparentResponses
                }}
                options={previewDisplayOptions}
                imageAlterText={item.imageAlterText}
                imageTitle={item.imageTitle}
                responseContainers={item.responses}
                imageUrl={item.imageUrl}
                imageWidth={item.imageWidth}
                question={previewStimulus}
                maxRespCount={item.maxRespCount}
                showDashedBorder={item.responseLayout && item.responseLayout.showdashedborder}
                uiStyle={uiStyle}
                backgroundColor={item.background}
                smallSize={smallSize}
                templateMarkUp={item.templateMarkUp}
                userSelections={userAnswer}
                userAnswer={userAnswer}
                onChange={this.handleAddAnswer}
              />
            )}
          </Wrapper>
        )}
      </div>
    );
  }
}

ClozeImageDragDrop.propTypes = {
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
  evaluation: PropTypes.any,
  theme: PropTypes.object.isRequired
};

ClozeImageDragDrop.defaultProps = {
  previewTab: 'clear',
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
  withNamespaces('assessment'),
  withTheme,
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

const ClozeImageDragDropContainer = enhance(ClozeImageDragDrop);

export { ClozeImageDragDropContainer as ClozeImageDragDrop };
