import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTheme } from "styled-components";
import { helpers } from "@edulastic/common";

import MapImage from "../../assets/map.svg";

import { QuestionHeader } from "../../styled/QuestionHeader";
import CorrectAnswerBoxLayout from "../../components/CorrectAnswerBoxLayout";

import CheckboxTemplateBoxLayout from "./components/CheckboxTemplateBoxLayout";
import { StyledPreviewTemplateBox } from "./styled/StyledPreviewTemplateBox";
import { StyledPreviewContainer } from "./styled/StyledPreviewContainer";
import { StyledPreviewImage } from "./styled/StyledPreviewImage";
import { StyledDisplayContainer } from "./styled/StyledDisplayContainer";
import { TemplateBoxContainer } from "./styled/TemplateBoxContainer";
import { TemplateBoxLayoutContainer } from "./styled/TemplateBoxLayoutContainer";
import { getFontSize } from "../../utils/helpers";
import ClozeTextInput from "../../components/ClozeTextInput";
import { Pointer } from "../../styled/Pointer";
import { Triangle } from "../../styled/Triangle";
import { Point } from "../../styled/Point";

class Display extends Component {
  constructor(props) {
    super(props);
    const userAnswers = new Array(props.responseContainers.length).fill("");
    props.userSelections.map((userSelection, index) => {
      userAnswers[index] = userSelection;
      return 0;
    });

    this.state = {
      userAnswers
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state !== undefined) {
      this.setState({
        userAnswers: nextProps.userSelections ? [...nextProps.userSelections] : []
      });
    }
  }

  getEmWidth = () => {
    const { uiStyle, imageWidth } = this.props;
    const fontSize = parseInt(getFontSize(uiStyle.fontsize), 10);
    return `${imageWidth / 14 + (fontSize - 14)}em`;
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

  render() {
    const {
      qIndex,
      question,
      options,
      uiStyle,
      showAnswer,
      checkAnswer,
      validation,
      evaluation,
      imageUrl,
      responseContainers,
      imageAlterText,
      imageWidth,
      showDashedBorder,
      backgroundColor,
      theme,
      item
    } = this.props;
    const { userAnswers } = this.state;

    const width = item.imagescale ? this.getEmWidth() : imageWidth;

    // Layout Options
    const fontSize = getFontSize(uiStyle.fontsize);
    const { height, wordwrap, stemnumeration } = uiStyle;

    const responseBtnStyle = {
      width: uiStyle.width !== 0 ? uiStyle.width : "auto",
      height: height !== 0 ? height : "auto",
      whiteSpace: wordwrap ? "inherit" : "nowrap"
    };

    const previewTemplateBoxLayout = (
      <StyledPreviewTemplateBox fontSize={fontSize}>
        <StyledPreviewContainer width={width}>
          <StyledPreviewImage src={imageUrl || MapImage} alt={imageAlterText} />
          {responseContainers.map((responseContainer, index) => {
            const dropTargetIndex = index;
            const btnStyle = {
              fontSize,
              width: responseContainer.width,
              top: responseContainer.top,
              left: responseContainer.left,
              height: responseContainer.height,
              border: showDashedBorder
                ? `dashed 2px ${theme.widgets.clozeImageText.responseContainerDashedBorderColor}`
                : `solid 1px ${theme.widgets.clozeImageText.responseContainerSolidBorderColor}`,
              position: "absolute",
              background: backgroundColor,
              borderRadius: 5
            };
            if (btnStyle && btnStyle.width === 0) {
              btnStyle.width = responseBtnStyle.width;
            } else {
              btnStyle.width = btnStyle.width;
            }

            const indexNumber = helpers.getNumeration(dropTargetIndex, stemnumeration);

            return (
              <div style={btnStyle}>
                <Pointer className={responseContainer.pointerPosition} width={responseContainer.width}>
                  <Point />
                  <Triangle />
                </Pointer>
                <ClozeTextInput
                  value={userAnswers[dropTargetIndex]}
                  style={{ width: "100%", height: "100%", margin: 0, fontSize }}
                  dropTargetIndex={dropTargetIndex}
                  onChange={({ value }) => this.selectChange(value, dropTargetIndex)}
                  placeholder={uiStyle.placeholder}
                  type={uiStyle.inputtype}
                  indexNumber={indexNumber}
                />
              </div>
            );
          })}
        </StyledPreviewContainer>
      </StyledPreviewTemplateBox>
    );

    const checkboxTemplateBoxLayout = (
      <CheckboxTemplateBoxLayout
        responseContainers={responseContainers}
        responseBtnStyle={responseBtnStyle}
        imageUrl={imageUrl || MapImage}
        imageWidth={imageWidth}
        imageAlterText={imageAlterText}
        stemnumeration={stemnumeration}
        fontSize={fontSize}
        showAnswer={showAnswer}
        options={options}
        userSelections={userAnswers}
        evaluation={evaluation}
      />
    );
    const templateBoxLayout = showAnswer || checkAnswer ? checkboxTemplateBoxLayout : previewTemplateBoxLayout;
    const correctAnswerBoxLayout = showAnswer ? (
      <CorrectAnswerBoxLayout
        fontSize={fontSize}
        groupResponses={options}
        userAnswers={validation.valid_response && validation.valid_response.value}
      />
    ) : (
      <div />
    );
    const answerBox = showAnswer ? correctAnswerBoxLayout : <div />;
    return (
      <StyledDisplayContainer fontSize={fontSize}>
        <QuestionHeader qIndex={qIndex} dangerouslySetInnerHTML={{ __html: question }} />
        <TemplateBoxContainer>
          <TemplateBoxLayoutContainer>{templateBoxLayout}</TemplateBoxLayoutContainer>
        </TemplateBoxContainer>
        {answerBox}
      </StyledDisplayContainer>
    );
  }
}

Display.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  showAnswer: PropTypes.bool,
  responseContainers: PropTypes.array,
  userSelections: PropTypes.array,
  checkAnswer: PropTypes.bool,
  showDashedBorder: PropTypes.bool,
  question: PropTypes.string.isRequired,
  qIndex: PropTypes.number.isRequired,
  validation: PropTypes.object,
  evaluation: PropTypes.array,
  backgroundColor: PropTypes.string,
  uiStyle: PropTypes.object,
  imageUrl: PropTypes.string,
  imageAlterText: PropTypes.string,
  imageWidth: PropTypes.number,
  theme: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

Display.defaultProps = {
  options: [],
  onChange: () => {},
  showAnswer: false,
  evaluation: [],
  checkAnswer: false,
  userSelections: [],
  responseContainers: [],
  showDashedBorder: false,
  backgroundColor: "#0288d1",
  validation: {},
  imageUrl: undefined,
  imageAlterText: "",
  imageWidth: 600,
  uiStyle: {
    fontsize: "normal",
    stemnumeration: "numerical",
    width: 0,
    height: 0,
    wordwrap: false
  }
};

export default withTheme(Display);
