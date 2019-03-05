import React, { Component } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { graph as checkAnswerMethod } from "@edulastic/evaluators";
import GraphContainer from "./GraphContainer";
import { CONSTANT, Colors } from "../../Builder/config";

const getFontSizeVal = name => {
  switch (name) {
    case "small":
      return 12;
    case "normal":
      return 14;
    case "large":
      return 17;
    case "extra_large":
      return 20;
    case "huge":
      return 24;
    default:
      return 14;
  }
};

const getSnapSize = (snapTo, axisDistance) => {
  if (snapTo === "grid" || Number.isNaN(parseInt(snapTo, 10))) {
    if (axisDistance) return axisDistance;
    return 1; // default
  }
  return snapTo;
};

const safeParseFloat = val => {
  if (val) {
    return parseFloat(val);
  }
  return 1;
};

const getColoredElems = (elements, compareResult) => {
  if (compareResult && compareResult.details && compareResult.details.length > 0) {
    let newElems = cloneDeep(elements);
    const subElems = [];
    const red = "#ee1658";
    const green = "#1fe3a1";

    newElems = newElems.map(el => {
      if (!el.subElement) {
        const detail = compareResult.details.find(det => det.id === el.id);
        let newEl = {};
        let result = false;

        if (detail && detail.result) {
          newEl = {
            colors: {
              strokeColor: green
            },
            ...el
          };
          result = true;
        } else {
          newEl = {
            colors: {
              strokeColor: red
            },
            ...el
          };
        }
        if (newEl.type === "point") newEl.colors.fillColor = result ? green : red;

        if (el.subElementsIds) {
          Object.values(el.subElementsIds).forEach(val => {
            subElems.push({
              id: val,
              result
            });
          });
        }
        return newEl;
      }
      return el;
    });

    newElems = newElems.map(el => {
      if (el.subElement) {
        const detail = subElems.find(det => det.id === el.id);
        let newEl = {};
        if (detail && detail.result) {
          newEl = {
            colors: {
              strokeColor: green,
              fillColor: green
            },
            ...el
          };
        } else {
          newEl = {
            colors: {
              fillColor: red,
              strokeColor: red
            },
            ...el
          };
        }
        return newEl;
      }
      return el;
    });
    return newElems;
  }
  return elements;
};

const getColoredAnswer = answerArr => {
  if (Array.isArray(answerArr)) {
    return answerArr.map(el => {
      let colors = {};
      switch (el.type) {
        case CONSTANT.TOOLS.POINT:
          colors = Colors.yellow[CONSTANT.TOOLS.POINT];
          break;
        case CONSTANT.TOOLS.LINE:
          colors = Colors.yellow[CONSTANT.TOOLS.LINE];
          break;
        case CONSTANT.TOOLS.RAY:
          colors = Colors.yellow[CONSTANT.TOOLS.RAY];
          break;
        case CONSTANT.TOOLS.SEGMENT:
          colors = Colors.yellow[CONSTANT.TOOLS.SEGMENT];
          break;
        case CONSTANT.TOOLS.VECTOR:
          colors = Colors.yellow[CONSTANT.TOOLS.VECTOR];
          break;
        case CONSTANT.TOOLS.CIRCLE:
          colors = Colors.yellow[CONSTANT.TOOLS.CIRCLE];
          break;
        case CONSTANT.TOOLS.SIN:
          colors = Colors.yellow[CONSTANT.TOOLS.SIN];
          break;
        case CONSTANT.TOOLS.POLYGON:
          colors = Colors.yellow[CONSTANT.TOOLS.POLYGON];
          break;
        case CONSTANT.TOOLS.PARABOLA:
          colors = Colors.yellow[CONSTANT.TOOLS.PARABOLA];
          break;
        default:
          break;
      }
      return {
        colors,
        ...el
      };
    });
  }
  return answerArr;
};

function evaluate(validation, userResponse) {
  return checkAnswerMethod({
    userResponse,
    validation
  });
}

class GraphContainerHOC extends Component {
  getMappedParameters = () => {
    const { uiStyle, canvasConfig, bgImgOptions, backgroundShapes, numberlineAxis } = this.props;
    return {
      canvas: {
        xMin: parseFloat(canvasConfig.x_min),
        xMax: parseFloat(canvasConfig.x_max),
        yMin: parseFloat(canvasConfig.y_min),
        yMax: parseFloat(canvasConfig.y_max),
        numberline: canvasConfig.numberline ? canvasConfig.numberline : false,
        margin: canvasConfig.margin ? parseFloat(canvasConfig.margin) : 0,
        responsesAllowed: canvasConfig.responsesAllowed ? parseInt(canvasConfig.responsesAllowed, 10) : 0
      },
      numberlineAxis: {
        leftArrow: numberlineAxis && numberlineAxis.leftArrow,
        rightArrow: numberlineAxis && numberlineAxis.rightArrow,
        showTicks: numberlineAxis && numberlineAxis.showTicks,
        snapToTicks: numberlineAxis && numberlineAxis.snapToTicks,
        showMin: numberlineAxis && numberlineAxis.showMin,
        showMax: numberlineAxis && numberlineAxis.showMax,
        ticksDistance: numberlineAxis && parseFloat(numberlineAxis.ticksDistance),
        fontSize: numberlineAxis && parseInt(numberlineAxis.fontSize, 10)
      },
      layout: {
        width: uiStyle.layout_width,
        margin: uiStyle.layout_margin,
        height: uiStyle.layout_height,
        snapTo: uiStyle.layout_snapto,
        fontSize: getFontSizeVal(uiStyle.currentFontSize)
      },
      pointParameters: {
        snapToGrid: true,
        snapSizeX: getSnapSize(uiStyle.layout_snapto, parseFloat(uiStyle.xDistance)),
        snapSizeY: getSnapSize(uiStyle.layout_snapto, parseFloat(uiStyle.yDistance)),
        showInfoBox: uiStyle.displayPositionOnHover,
        withLabel: false
      },
      xAxesParameters: {
        ticksDistance: safeParseFloat(uiStyle.xTickDistance),
        name: uiStyle.xShowAxisLabel ? uiStyle.xAxisLabel : "",
        showTicks: !uiStyle.xHideTicks,
        drawLabels: uiStyle.xDrawLabel,
        maxArrow: uiStyle.xMaxArrow,
        minArrow: uiStyle.xMinArrow,
        commaInLabel: uiStyle.xCommaInLabel
      },
      yAxesParameters: {
        ticksDistance: safeParseFloat(uiStyle.yTickDistance),
        name: uiStyle.yShowAxisLabel ? uiStyle.yAxisLabel : "",
        showTicks: !uiStyle.yHideTicks,
        drawLabels: uiStyle.yDrawLabel,
        maxArrow: uiStyle.yMaxArrow,
        minArrow: uiStyle.yMinArrow,
        commaInLabel: uiStyle.yCommaInLabel
      },
      gridParams: {
        gridY: safeParseFloat(uiStyle.yDistance),
        gridX: safeParseFloat(uiStyle.xDistance)
      },
      bgImgOptions: {
        urlImg: bgImgOptions.src,
        opacity: bgImgOptions.opacity / 100,
        coords: [bgImgOptions.x, bgImgOptions.y],
        size: [bgImgOptions.width, bgImgOptions.height]
      },
      backgroundShapes: {
        values: backgroundShapes || [],
        showPoints: !!bgImgOptions.showShapePoints
      }
    };
  };

  render() {
    const {
      elements,
      onChange,
      tools,
      answer,
      showAnswer,
      checkAnswer,
      validation,
      changePreviewTab,
      evaluation
    } = this.props;
    let correct = false;
    let newElems = elements;

    if (checkAnswer) {
      if (evaluation && evaluation.length) {
        correct = evaluation.commonResult;
        newElems = getColoredElems(elements, evaluation);
      } else {
        const compareResult = evaluate(validation, elements);
        correct = compareResult.commonResult;
        newElems = getColoredElems(elements, compareResult);
      }
    } else if (showAnswer) {
      const compareResult = checkAnswerMethod({
        userResponse: elements,
        validation
      });
      correct = compareResult.commonResult;
      newElems = getColoredElems(elements, compareResult);
    }
    const coloredAnswer = getColoredAnswer(answer);

    return (
      <GraphContainer
        {...this.getMappedParameters()}
        value={newElems}
        setValue={onChange}
        tools={tools}
        answer={coloredAnswer}
        showAnswer={showAnswer}
        checkAnswer={checkAnswer}
        correct={correct}
        changePreviewTab={changePreviewTab}
      />
    );
  }
}

GraphContainerHOC.propTypes = {
  tools: PropTypes.array.isRequired,
  canvasConfig: PropTypes.object.isRequired,
  uiStyle: PropTypes.object.isRequired,
  bgImgOptions: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  backgroundShapes: PropTypes.array,
  evaluation: PropTypes.any
};

GraphContainerHOC.defaultProps = {
  backgroundShapes: [],
  evaluation: null
};

export default GraphContainerHOC;
