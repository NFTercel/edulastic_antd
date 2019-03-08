import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import QuestionHeader from "../common/QuestionHeader";
import { QuadrantsContainer } from "./QuadrantsContainer";
import { AxisLabelsContainer } from "./AxisLabelsContainer";
import { AxisSegmentsContainer } from "./AxisSegmentsContainer";

const safeParseFloat = val => {
  if (val) {
    return parseFloat(val);
  }
  return 1;
};

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

class GraphDisplay extends Component {
  getGraphContainer = () => {
    const { graphData } = this.props;
    const { graphType } = graphData;

    switch (graphType) {
      case "axisSegments":
        return AxisSegmentsContainer;
      case "axisLabels":
        return AxisLabelsContainer;
      case "quadrants":
      case "firstQuadrant":
      default:
        return QuadrantsContainer;
    }
  };

  getGraphContainerProps = () => {
    const { graphData } = this.props;
    const { graphType } = graphData;

    switch (graphType) {
      case "axisSegments":
        return this.getAxisSegmentsProps();
      case "axisLabels":
        return this.getAxisLabelsProps();
      case "quadrants":
      case "firstQuadrant":
      default:
        return this.getQuadrantsProps();
    }
  };

  getQuadrantsProps = () => {
    const { graphData, evaluation, onChange, showAnswer, checkAnswer, changePreviewTab, elements, shapes } = this.props;

    const {
      ui_style,
      canvas,
      background_image,
      background_shapes,
      toolbar,
      controlbar,
      validation,
      annotation
    } = graphData;

    return {
      canvas: {
        xMin: parseFloat(canvas.x_min),
        xMax: parseFloat(canvas.x_max),
        yMin: parseFloat(canvas.y_min),
        yMax: parseFloat(canvas.y_max)
      },
      layout: {
        width: ui_style.layout_width,
        margin: ui_style.layout_margin,
        height: ui_style.layout_height,
        snapTo: ui_style.layout_snapto,
        fontSize: getFontSizeVal(ui_style.currentFontSize)
      },
      pointParameters: {
        snapToGrid: true,
        snapSizeX: getSnapSize(ui_style.layout_snapto, parseFloat(ui_style.xDistance)),
        snapSizeY: getSnapSize(ui_style.layout_snapto, parseFloat(ui_style.yDistance)),
        showInfoBox: ui_style.displayPositionOnHover,
        withLabel: false
      },
      xAxesParameters: {
        ticksDistance: safeParseFloat(ui_style.xTickDistance),
        name: ui_style.xShowAxisLabel ? ui_style.xAxisLabel : "",
        showTicks: !ui_style.xHideTicks,
        drawLabels: ui_style.xDrawLabel,
        maxArrow: ui_style.xMaxArrow,
        minArrow: ui_style.xMinArrow,
        commaInLabel: ui_style.xCommaInLabel
      },
      yAxesParameters: {
        ticksDistance: safeParseFloat(ui_style.yTickDistance),
        name: ui_style.yShowAxisLabel ? ui_style.yAxisLabel : "",
        showTicks: !ui_style.yHideTicks,
        drawLabels: ui_style.yDrawLabel,
        maxArrow: ui_style.yMaxArrow,
        minArrow: ui_style.yMinArrow,
        commaInLabel: ui_style.yCommaInLabel
      },
      gridParams: {
        gridY: safeParseFloat(ui_style.yDistance),
        gridX: safeParseFloat(ui_style.xDistance)
      },
      bgImgOptions: {
        urlImg: background_image.src,
        opacity: background_image.opacity / 100,
        coords: [background_image.x, background_image.y],
        size: [background_image.width, background_image.height]
      },
      backgroundShapes: {
        values: background_shapes || [],
        showPoints: !!background_image.showShapePoints
      },
      evaluation,
      tools: toolbar ? toolbar.tools : [],
      controls: controlbar ? controlbar.controls : [],
      setValue: onChange,
      validation,
      elements,
      showAnswer,
      checkAnswer,
      changePreviewTab,
      shapes,
      annotation
    };
  };

  getAxisSegmentsProps = () => {
    const { graphData, evaluation, onChange, showAnswer, checkAnswer, changePreviewTab, elements } = this.props;

    const { ui_style, canvas, toolbar, numberlineAxis, validation, graphType } = graphData;

    return {
      canvas: {
        xMin: parseFloat(canvas.x_min),
        xMax: parseFloat(canvas.x_max),
        yMin: parseFloat(canvas.y_min),
        yMax: parseFloat(canvas.y_max),
        numberline: true,
        margin: parseFloat(canvas.margin),
        responsesAllowed: parseInt(canvas.responsesAllowed, 10),
        title: canvas.title
      },
      numberlineAxis: {
        leftArrow: numberlineAxis && numberlineAxis.leftArrow,
        rightArrow: numberlineAxis && numberlineAxis.rightArrow,
        showTicks: numberlineAxis && numberlineAxis.showTicks,
        snapToTicks: numberlineAxis && numberlineAxis.snapToTicks,
        showMin: numberlineAxis && numberlineAxis.showMin,
        showMax: numberlineAxis && numberlineAxis.showMax,
        ticksDistance: numberlineAxis && parseFloat(numberlineAxis.ticksDistance),
        fontSize: numberlineAxis && parseInt(numberlineAxis.fontSize, 10),
        stackResponses: numberlineAxis && numberlineAxis.stackResponses,
        stackResponsesSpacing: numberlineAxis && parseInt(numberlineAxis.stackResponsesSpacing, 10),
        renderingBase: numberlineAxis && numberlineAxis.renderingBase,
        specificPoints: numberlineAxis && numberlineAxis.specificPoints,
        minorTicks: numberlineAxis && parseFloat(numberlineAxis.minorTicks),
        showLabels: numberlineAxis && numberlineAxis.showLabels,
        labelShowMax: numberlineAxis && numberlineAxis.labelShowMax,
        labelShowMin: numberlineAxis && numberlineAxis.labelShowMin
      },
      layout: {
        width: ui_style.layout_width,
        margin: ui_style.layout_margin,
        height: ui_style.layout_height,
        snapTo: ui_style.layout_snapto,
        fontSize: getFontSizeVal(ui_style.currentFontSize),
        titlePosition: parseInt(ui_style.title_position, 10),
        linePosition: numberlineAxis.stackResponses ? 75 : parseInt(ui_style.line_position, 10),
        pointBoxPosition: parseInt(ui_style.point_box_position, 10)
      },
      pointParameters: {
        snapToGrid: true,
        snapSizeX: getSnapSize(ui_style.layout_snapto, parseFloat(ui_style.xDistance)),
        snapSizeY: getSnapSize(ui_style.layout_snapto, parseFloat(ui_style.yDistance)),
        showInfoBox: ui_style.displayPositionOnHover,
        withLabel: false
      },
      xAxesParameters: {
        ticksDistance: safeParseFloat(ui_style.xTickDistance),
        name: ui_style.xShowAxisLabel ? ui_style.xAxisLabel : "",
        showTicks: !ui_style.xHideTicks,
        drawLabels: ui_style.xDrawLabel,
        maxArrow: ui_style.xMaxArrow,
        minArrow: ui_style.xMinArrow,
        commaInLabel: ui_style.xCommaInLabel,
        strokeColor: ui_style.xStrokeColor ? ui_style.xStrokeColor : "#00b0ff",
        tickEndings: ui_style.xTickEndings ? ui_style.xTickEndings : false,
        visible: ui_style.xVisible === undefined ? true : ui_style.xVisible
      },
      yAxesParameters: {
        ticksDistance: safeParseFloat(ui_style.yTickDistance),
        name: ui_style.yShowAxisLabel ? ui_style.yAxisLabel : "",
        showTicks: !ui_style.yHideTicks,
        drawLabels: ui_style.yDrawLabel,
        maxArrow: ui_style.yMaxArrow,
        minArrow: ui_style.yMinArrow,
        commaInLabel: ui_style.yCommaInLabel,
        minorTicks: ui_style.yMinorTicks ? ui_style.yMinorTicks : 0,
        visible: ui_style.yVisible === undefined ? true : ui_style.yVisible
      },
      gridParams: {
        gridY: safeParseFloat(ui_style.yDistance),
        gridX: safeParseFloat(ui_style.xDistance),
        visible: ui_style.gridVisible === undefined ? true : ui_style.yVisible
      },
      evaluation,
      tools: toolbar ? toolbar.tools : [],
      setValue: onChange,
      validation,
      elements,
      showAnswer,
      checkAnswer,
      changePreviewTab,
      graphType
    };
  };

  getAxisLabelsProps = () => {
    const { graphData, evaluation, onChange, showAnswer, checkAnswer, changePreviewTab, elements } = this.props;

    const { ui_style, canvas, numberlineAxis, validation, list, graphType } = graphData;

    return {
      canvas: {
        xMin: parseFloat(canvas.x_min),
        xMax: parseFloat(canvas.x_max),
        yMin: parseFloat(canvas.y_min),
        yMax: parseFloat(canvas.y_max),
        numberline: true,
        margin: parseFloat(canvas.margin),
        title: canvas.title
      },
      numberlineAxis: {
        leftArrow: numberlineAxis && numberlineAxis.leftArrow,
        rightArrow: numberlineAxis && numberlineAxis.rightArrow,
        showTicks: numberlineAxis && numberlineAxis.showTicks,
        snapToTicks: numberlineAxis && numberlineAxis.snapToTicks,
        showMin: numberlineAxis && numberlineAxis.showMin,
        showMax: numberlineAxis && numberlineAxis.showMax,
        ticksDistance: numberlineAxis && numberlineAxis.ticksDistance,
        fontSize: numberlineAxis && parseInt(numberlineAxis.fontSize, 10),
        labelsFrequency: numberlineAxis && parseInt(numberlineAxis.labelsFrequency, 10),
        separationDistanceX: numberlineAxis && parseInt(numberlineAxis.separationDistanceX, 10),
        separationDistanceY: numberlineAxis && parseInt(numberlineAxis.separationDistanceY, 10),
        renderingBase: numberlineAxis && numberlineAxis.renderingBase,
        specificPoints: numberlineAxis && numberlineAxis.specificPoints,
        fractionsFormat: numberlineAxis && numberlineAxis.fractionsFormat,
        minorTicks: numberlineAxis && parseFloat(numberlineAxis.minorTicks),
        showLabels: numberlineAxis && numberlineAxis.showLabels,
        labelShowMax: numberlineAxis && numberlineAxis.labelShowMax,
        labelShowMin: numberlineAxis && numberlineAxis.labelShowMin
      },
      layout: {
        width: ui_style.layout_width,
        margin: ui_style.layout_margin,
        height: ui_style.layout_height,
        snapTo: ui_style.layout_snapto,
        fontSize: getFontSizeVal(ui_style.currentFontSize),
        titlePosition: parseInt(ui_style.title_position, 10),
        linePosition: parseInt(ui_style.line_position, 10),
        pointBoxPosition: parseInt(ui_style.point_box_position, 10)
      },
      pointParameters: {
        snapToGrid: true,
        snapSizeX: getSnapSize(ui_style.layout_snapto, parseFloat(ui_style.xDistance)),
        snapSizeY: getSnapSize(ui_style.layout_snapto, parseFloat(ui_style.yDistance)),
        showInfoBox: ui_style.displayPositionOnHover,
        withLabel: false
      },
      xAxesParameters: {
        ticksDistance: safeParseFloat(ui_style.xTickDistance),
        name: ui_style.xShowAxisLabel ? ui_style.xAxisLabel : "",
        showTicks: !ui_style.xHideTicks,
        drawLabels: ui_style.xDrawLabel,
        maxArrow: ui_style.xMaxArrow,
        minArrow: ui_style.xMinArrow,
        commaInLabel: ui_style.xCommaInLabel,
        strokeColor: ui_style.xStrokeColor ? ui_style.xStrokeColor : "#00b0ff",
        tickEndings: ui_style.xTickEndings ? ui_style.xTickEndings : false,
        visible: ui_style.xVisible === undefined ? true : ui_style.xVisible
      },
      yAxesParameters: {
        ticksDistance: safeParseFloat(ui_style.yTickDistance),
        name: ui_style.yShowAxisLabel ? ui_style.yAxisLabel : "",
        showTicks: !ui_style.yHideTicks,
        drawLabels: ui_style.yDrawLabel,
        maxArrow: ui_style.yMaxArrow,
        minArrow: ui_style.yMinArrow,
        commaInLabel: ui_style.yCommaInLabel,
        minorTicks: ui_style.yMinorTicks ? ui_style.yMinorTicks : 0,
        visible: ui_style.yVisible === undefined ? true : ui_style.yVisible
      },
      gridParams: {
        gridY: safeParseFloat(ui_style.yDistance),
        gridX: safeParseFloat(ui_style.xDistance),
        visible: ui_style.gridVisible === undefined ? true : ui_style.yVisible
      },
      list,
      graphType,
      evaluation,
      setValue: onChange,
      validation,
      elements,
      showAnswer,
      checkAnswer,
      changePreviewTab
    };
  };

  render() {
    const { graphData, smallSize, showAnswer, checkAnswer, clearAnswer, qIndex } = this.props;
    const { stimulus } = graphData;

    const GraphContainer = this.getGraphContainer();

    return (
      <Fragment>
        <QuestionHeader
          qIndex={qIndex}
          smallSize={smallSize}
          dangerouslySetInnerHTML={{ __html: stimulus }}
          data-cy="questionHeader"
        />
        {showAnswer ? "showAnswer" : null}
        {checkAnswer ? "checkAnswer" : null}
        {clearAnswer ? "clearAnswer" : null}
        <GraphContainer {...this.getGraphContainerProps()} />
      </Fragment>
    );
  }
}

GraphDisplay.propTypes = {
  graphData: PropTypes.object.isRequired,
  smallSize: PropTypes.bool,
  onChange: PropTypes.func,
  changePreviewTab: PropTypes.func,
  elements: PropTypes.array,
  evaluation: PropTypes.any,
  showAnswer: PropTypes.bool,
  checkAnswer: PropTypes.bool,
  clearAnswer: PropTypes.bool
};

GraphDisplay.defaultProps = {
  smallSize: false,
  onChange: () => {},
  changePreviewTab: () => {},
  elements: [],
  evaluation: null,
  showAnswer: false,
  checkAnswer: false,
  clearAnswer: false
};

export default GraphDisplay;
