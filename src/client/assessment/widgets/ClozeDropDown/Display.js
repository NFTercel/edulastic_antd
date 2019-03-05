import PropTypes from "prop-types";
import React, { Component } from "react";
import { Select } from "antd";
import { isUndefined, mapValues, cloneDeep } from "lodash";
import { withTheme } from "styled-components";

import { InstructorStimulus } from "@edulastic/common";

import { QuestionHeader } from "../../styled/QuestionHeader";
import CorrectAnswerBoxLayout from "../../components/CorrectAnswerBoxLayout";
import { getFontSize } from "../../utils/helpers";

import CheckboxTemplateBoxLayout from "./components/CheckboxTemplateBoxLayout";
import { withCheckAnswerButton } from "../../components/HOC/withCheckAnswerButton";

const { Option } = Select;

const defaultTemplateMarkup =
  '<p>"It\'s all clear" he</p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p><br/>Have you the </p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p> and the bags? <br /> Great Scott!!! Jump, archie, jump, and I\'ll swing for it</p>';

class ClozeDropDownDisplay extends Component {
  constructor(props) {
    super(props);
    const { templateMarkUp } = props;
    const { templateParts, respLength } = this.getTemplateParts(templateMarkUp);
    const userAnswers = new Array(respLength).fill(false);
    props.userSelections.map((userSelection, index) => {
      userAnswers[index] = userSelection;
      return 0;
    });
    this.state = {
      templateParts,
      userAnswers
    };
  }

  componentWillReceiveProps(nextProps) {
    const { templateMarkUp } = nextProps;
    if (this.state !== undefined) {
      const { templateParts } = this.getTemplateParts(templateMarkUp);
      this.setState({
        userAnswers: nextProps.userSelections ? [...nextProps.userSelections] : [],
        templateParts
      });
    }
  }

  getTemplateParts = templateMarkUp => {
    let templateMarkUpStr = templateMarkUp;
    if (!templateMarkUpStr) {
      templateMarkUpStr = defaultTemplateMarkup;
    }
    const templateParts = templateMarkUpStr.match(/<p.*?<\/p>/g);
    const responseParts = templateMarkUpStr.match(/<p class="response-btn.*?<\/p>/g);
    const respLength = responseParts !== null ? responseParts.length : 0;
    return { templateParts, respLength };
  };

  selectChange = (value, index) => {
    const { userAnswers: newAnswers } = this.state;
    const { onChange: changeAnswers } = this.props;
    newAnswers[index] = value;
    this.setState({ userAnswers: newAnswers });
    changeAnswers(newAnswers);
  };

  shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  shuffleGroup = data =>
    mapValues(data, (value, key) => {
      if (!isUndefined(value)) {
        data[key] = this.shuffle(value);
      }
      data[key] = value;
      return data[key];
    });

  render() {
    const {
      qIndex,
      smallSize,
      question,
      configureOptions,
      preview,
      options,
      uiStyle,
      showAnswer,
      checkAnswer,
      evaluation,
      instructorStimulus,
      theme,
      item
    } = this.props;
    const { templateParts, userAnswers } = this.state;
    const { shuffleOptions } = configureOptions;
    let responseIndex = 0;
    let responses = cloneDeep(options);
    if (preview && shuffleOptions) {
      responses = this.shuffleGroup(responses);
    }

    // Layout Options
    const fontSize = getFontSize(uiStyle.fontsize);
    const { placeholder, responsecontainerindividuals, stemnumeration } = uiStyle;

    const responseBtnStyle = {
      widthpx: uiStyle.widthpx !== 0 ? uiStyle.widthpx : "auto",
      heightpx: uiStyle.heightpx !== 0 ? uiStyle.heightpx : "auto"
    };

    let maxLineHeight = smallSize ? 50 : 40;

    const previewTemplateBoxLayout = (
      <div
        className={`template_box ${smallSize ? "dropdown-small" : ""}`}
        style={{
          fontSize: smallSize ? theme.widgets.clozeDropDown.previewTemplateBoxSmallFontSize : fontSize,
          padding: smallSize ? 0 : 20
        }}
      >
        {templateParts.map((templatePart, index) => {
          if (templatePart.indexOf('class="response-btn"') !== -1) {
            const dropTargetIndex = responseIndex;
            responseIndex++;
            const btnStyle = {
              width: 0,
              height: 0,
              widthpx: 0,
              heightpx: 0,
              placeholder
            };
            if (responsecontainerindividuals && responsecontainerindividuals[dropTargetIndex]) {
              const { widthpx, heightpx } = responsecontainerindividuals[dropTargetIndex];
              btnStyle.width = widthpx;
              btnStyle.height = heightpx;
              btnStyle.widthpx = widthpx;
              btnStyle.heightpx = heightpx;
              btnStyle.placeholder = placeholder;
            }
            if (btnStyle && btnStyle.width === 0) {
              btnStyle.width = responseBtnStyle.widthpx;
            } else {
              btnStyle.width = btnStyle.widthpx;
            }
            if (btnStyle && btnStyle.height === 0) {
              btnStyle.height = responseBtnStyle.heightpx;
            } else {
              btnStyle.height = btnStyle.heightpx;
            }
            if (btnStyle && btnStyle.placeholder === undefined) {
              btnStyle.placeholder = responseBtnStyle.placeholder;
            }
            maxLineHeight = maxLineHeight < btnStyle.height ? btnStyle.height : maxLineHeight;
            return (
              <Select
                value={userAnswers[dropTargetIndex]}
                style={btnStyle}
                onChange={value => this.selectChange(value, dropTargetIndex)}
              >
                <Option value="**default_value**" disabled>
                  {placeholder}
                </Option>
                {responses &&
                  responses[dropTargetIndex] &&
                  responses[dropTargetIndex].map((response, respID) => (
                    <Option value={response} key={respID}>
                      {response}
                    </Option>
                  ))}
              </Select>
            );
          }
          return (
            <span
              style={{ userSelect: "none", lineHeight: `${maxLineHeight}px` }}
              key={index}
              dangerouslySetInnerHTML={{ __html: templatePart }}
            />
          );
        })}
      </div>
    );

    const checkboxTemplateBoxLayout = (
      <CheckboxTemplateBoxLayout
        templateParts={templateParts}
        responsecontainerindividuals={responsecontainerindividuals}
        responseBtnStyle={responseBtnStyle}
        stemNumeration={stemnumeration}
        fontSize={fontSize}
        showAnswer={showAnswer}
        userSelections={userAnswers}
        evaluation={evaluation}
      />
    );
    const templateBoxLayout = showAnswer || checkAnswer ? checkboxTemplateBoxLayout : previewTemplateBoxLayout;
    const correctAnswerBoxLayout = showAnswer ? (
      <CorrectAnswerBoxLayout
        fontSize={fontSize}
        groupResponses={options}
        userAnswers={item.validation.valid_response && item.validation.valid_response.value}
      />
    ) : (
      <div />
    );
    const answerBox = showAnswer ? correctAnswerBoxLayout : <div />;
    return (
      <div style={{ fontSize }}>
        <InstructorStimulus>{instructorStimulus}</InstructorStimulus>
        <QuestionHeader qIndex={qIndex} smallSize={smallSize} dangerouslySetInnerHTML={{ __html: question }} />
        <div style={{ margin: smallSize ? "-10px -20px" : 0, borderRadius: 0 }}>{templateBoxLayout}</div>
        {answerBox}
      </div>
    );
  }
}

ClozeDropDownDisplay.propTypes = {
  options: PropTypes.object,
  onChange: PropTypes.func,
  preview: PropTypes.bool,
  showAnswer: PropTypes.bool,
  userSelections: PropTypes.array,
  smallSize: PropTypes.bool,
  checkAnswer: PropTypes.bool,
  templateMarkUp: PropTypes.string,
  question: PropTypes.string.isRequired,
  configureOptions: PropTypes.object,
  evaluation: PropTypes.object,
  uiStyle: PropTypes.object,
  instructorStimulus: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

ClozeDropDownDisplay.defaultProps = {
  options: {},
  onChange: () => {},
  preview: true,
  showAnswer: false,
  evaluation: {},
  checkAnswer: false,
  userSelections: [],
  templateMarkUp: defaultTemplateMarkup,
  smallSize: false,
  configureOptions: {
    shuffleOptions: false
  },
  uiStyle: {
    fontsize: "normal",
    stemnumeration: "numerical",
    widthpx: 0,
    heightpx: 0,
    placeholder: null,
    responsecontainerindividuals: []
  }
};

export default withTheme(withCheckAnswerButton(ClozeDropDownDisplay));
