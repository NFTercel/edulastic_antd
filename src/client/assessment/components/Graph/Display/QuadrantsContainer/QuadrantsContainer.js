import React, { Component } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { graph as checkAnswerMethod } from "@edulastic/evaluators";
import {
  IconGraphRay as IconRay,
  IconGraphLine as IconLine,
  IconGraphLabel as IconLabel,
  IconGraphPoint as IconPoint,
  IconGraphSine as IconSine,
  IconGraphParabola as IconParabola,
  IconGraphCircle as IconCircle,
  IconGraphVector as IconVector,
  IconGraphSegment as IconSegment,
  IconGraphPolygon as IconPolygon
} from "@edulastic/icons";
import Tools from "./Tools";
import { makeBorder } from "../../Builder/index";
import { CONSTANT, Colors } from "../../Builder/config";
import {
  defaultGraphParameters,
  defaultPointParameters,
  defaultAxesParameters,
  defaultGridParameters
} from "../../Builder/settings";
import { GraphWrapper, JSXBox, LabelTop, LabelBottom, LabelLeft, LabelRight, Title } from "./styled";

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

const getCompareResult = evaluation => {
  if (!evaluation || !evaluation.evaluation) {
    return null;
  }

  let compareResult = null;

  Object.keys(evaluation.evaluation).forEach(key => {
    if (compareResult) {
      return;
    }
    if (evaluation.evaluation[key].commonResult) {
      compareResult = evaluation.evaluation[key];
    }
  });

  if (compareResult) {
    return compareResult;
  }

  return evaluation.evaluation[0];
};

class GraphContainer extends Component {
  constructor(props) {
    super(props);

    this._graphId = `jxgbox${Math.random().toString(36)}`;
    this._graph = null;

    this.state = {
      selectedTool: this.getDefaultTool(),
      elementsStash: [],
      currentStashIndex: 0
    };

    this.onSelectTool = this.onSelectTool.bind(this);
    this.onReset = this.onReset.bind(this);
    this.getConfig = this.getConfig.bind(this);
  }

  getDefaultTool() {
    const { tools } = this.props;

    return {
      name: tools[0],
      index: 0,
      groupIndex: -1
    };
  }

  setDefaultToolState() {
    this.setState({ selectedTool: this.getDefaultTool() });
  }

  componentDidMount() {
    const {
      canvas,
      pointParameters,
      xAxesParameters,
      yAxesParameters,
      layout,
      gridParams,
      bgImgOptions,
      backgroundShapes,
      showAnswer,
      validation,
      tools
    } = this.props;

    this._graph = makeBorder(this._graphId);

    this._graph.setTool(tools[0]);

    if (this._graph) {
      this._graph.resizeContainer(layout.width, layout.height);
      this._graph.setGraphParameters({
        ...defaultGraphParameters(),
        ...canvas
      });
      this._graph.setPointParameters({
        ...defaultPointParameters(),
        ...pointParameters
      });
      this._graph.setAxesParameters({
        x: {
          ...defaultAxesParameters(),
          ...xAxesParameters
        },
        y: {
          ...yAxesParameters
        }
      });
      this._graph.setGridParameters({
        ...defaultGridParameters(),
        ...gridParams
      });
      this._graph.setBgImage(bgImgOptions);
      this._graph.setBgObjects(backgroundShapes.values, backgroundShapes.showPoints);

      if (showAnswer) {
        this._graph.setAnswer(getColoredAnswer(validation ? validation.valid_response.value : []));
      } else {
        this._graph.removeAnswers();
      }
    }

    this.mapElementsToGraph();

    this.setGraphUpdateEventHandler();

    const elementsStash = this.state.elementsStash.concat([this._graph.getConfig()]);

    this.setState({
      elementsStash: elementsStash,
      currentStashIndex: elementsStash.length - 1
    });
  }

  componentDidUpdate(prevProps) {
    const {
      canvas,
      pointParameters,
      xAxesParameters,
      yAxesParameters,
      layout,
      gridParams,
      bgImgOptions,
      backgroundShapes,
      tools,
      elements
    } = this.props;

    if (JSON.stringify(tools) !== JSON.stringify(prevProps.tools)) {
      this.setDefaultToolState();
      this._graph.setTool(tools[0]);
    }

    if (this._graph) {
      if (
        canvas.xMin !== prevProps.canvas.xMin ||
        canvas.xMax !== prevProps.canvas.xMax ||
        canvas.yMin !== prevProps.canvas.yMin ||
        canvas.yMax !== prevProps.canvas.yMax
      ) {
        this._graph.setGraphParameters({
          ...defaultGraphParameters(),
          ...canvas
        });
      }

      if (
        pointParameters.snapToGrid !== prevProps.pointParameters.snapToGrid ||
        pointParameters.snapSizeX !== prevProps.pointParameters.snapSizeX ||
        pointParameters.snapSizeY !== prevProps.pointParameters.snapSizeY ||
        pointParameters.showInfoBox !== prevProps.pointParameters.showInfoBox ||
        pointParameters.withLabel !== prevProps.pointParameters.withLabel
      ) {
        this._graph.setPointParameters({
          ...defaultPointParameters(),
          ...pointParameters
        });
      }

      if (
        xAxesParameters.ticksDistance !== prevProps.xAxesParameters.ticksDistance ||
        xAxesParameters.name !== prevProps.xAxesParameters.name ||
        xAxesParameters.showTicks !== prevProps.xAxesParameters.showTicks ||
        xAxesParameters.drawLabels !== prevProps.xAxesParameters.drawLabels ||
        xAxesParameters.maxArrow !== prevProps.xAxesParameters.maxArrow ||
        xAxesParameters.minArrow !== prevProps.xAxesParameters.minArrow ||
        xAxesParameters.commaInLabel !== prevProps.xAxesParameters.commaInLabel ||
        yAxesParameters.ticksDistance !== prevProps.yAxesParameters.ticksDistance ||
        yAxesParameters.name !== prevProps.yAxesParameters.name ||
        yAxesParameters.showTicks !== prevProps.yAxesParameters.showTicks ||
        yAxesParameters.drawLabels !== prevProps.yAxesParameters.drawLabels ||
        yAxesParameters.maxArrow !== prevProps.yAxesParameters.maxArrow ||
        yAxesParameters.minArrow !== prevProps.yAxesParameters.minArrow ||
        yAxesParameters.commaInLabel !== prevProps.yAxesParameters.commaInLabel
      ) {
        this._graph.setAxesParameters({
          x: {
            ...defaultAxesParameters(),
            ...xAxesParameters
          },
          y: {
            ...defaultAxesParameters(),
            ...yAxesParameters
          }
        });
      }

      if (layout.width !== prevProps.layout.width || layout.height !== prevProps.layout.height) {
        this._graph.resizeContainer(layout.width, layout.height);
      }

      if (gridParams.gridY !== prevProps.gridParams.gridY || gridParams.gridX !== prevProps.gridParams.gridX) {
        this._graph.setGridParameters({
          ...defaultGridParameters(),
          ...gridParams
        });
      }

      if (
        bgImgOptions.urlImg !== prevProps.bgImgOptions.urlImg ||
        bgImgOptions.opacity !== prevProps.bgImgOptions.opacity ||
        bgImgOptions.coords[0] !== prevProps.bgImgOptions.coords[0] ||
        bgImgOptions.coords[1] !== prevProps.bgImgOptions.coords[1] ||
        bgImgOptions.size[0] !== prevProps.bgImgOptions.size[0] ||
        bgImgOptions.size[1] !== prevProps.bgImgOptions.size[1]
      ) {
        this._graph.removeBgImage();
        this._graph.setBgImage(bgImgOptions);
      }

      if (
        JSON.stringify(backgroundShapes.values) !== JSON.stringify(prevProps.backgroundShapes.values) ||
        backgroundShapes.showPoints !== prevProps.backgroundShapes.showPoints
      ) {
        this._graph.resetBg();
        this._graph.setBgObjects(backgroundShapes.values, backgroundShapes.showPoints);
      }

      if (JSON.stringify(elements) !== JSON.stringify(this._graph.getConfig())) {
        this._graph.reset();
        this.mapElementsToGraph();
      }
    }
  }

  onSelectTool({ name, index, groupIndex }) {
    this.setState({ selectedTool: { name, index, groupIndex } });
    this._graph.setTool(name);
  }

  onReset() {
    const { tools } = this.props;

    this.setState({
      selectedTool: this.getDefaultTool()
    });

    this._graph.setTool(tools[0]);
    this._graph.reset();
    this.getConfig();
    const elementsStash = this.state.elementsStash.concat([this._graph.getConfig()]);
    this.setState({
      elementsStash: elementsStash,
      currentStashIndex: elementsStash.length - 1
    });
  }

  onUndo = () => {
    const { currentStashIndex, elementsStash } = this.state;
    if (currentStashIndex > 0 && currentStashIndex <= elementsStash.length - 1) {
      this.setState(
        state => ({ currentStashIndex: state.currentStashIndex - 1 }),
        () => {
          this._graph.reset();
          this._graph.loadFromConfig(elementsStash[this.state.currentStashIndex]);
          this.props.setValue(elementsStash[this.state.currentStashIndex]);
        }
      );
    }
  };

  onRedo() {
    const { currentStashIndex, elementsStash } = this.state;
    if (currentStashIndex >= 0 && currentStashIndex < elementsStash.length - 1) {
      this.setState(
        state => ({ currentStashIndex: state.currentStashIndex + 1 }),
        () => {
          this._graph.reset();
          this._graph.loadFromConfig(elementsStash[this.state.currentStashIndex]);
          this.props.setValue(elementsStash[this.state.currentStashIndex]);
        }
      );
    }
  }

  getHandlerByControlName = control => {
    switch (control) {
      case "undo":
        return this.onUndo();
      case "redo":
        return this.onRedo();
      case "reset":
        return this.onReset();
      default:
        return null;
    }
  };

  getConfig() {
    const conf = this._graph.getConfig();
    const { setValue, changePreviewTab, checkAnswer } = this.props;
    setValue(conf);

    if (checkAnswer) {
      changePreviewTab("clear");
    }
  }

  setGraphUpdateEventHandler = () => {
    this._graph.events.on(CONSTANT.EVENT_NAMES.CHANGE_MOVE, () => {
      this.getConfig();
      const elementsStash = this.state.elementsStash.concat([this._graph.getConfig()]);
      this.setState({
        elementsStash: elementsStash,
        currentStashIndex: elementsStash.length - 1
      });
    });
    this._graph.events.on(CONSTANT.EVENT_NAMES.CHANGE_NEW, () => {
      this.getConfig();
      const elementsStash = this.state.elementsStash.concat([this._graph.getConfig()]);
      this.setState({
        elementsStash: elementsStash,
        currentStashIndex: elementsStash.length - 1
      });
    });
  };

  mapElementsToGraph = () => {
    const { elements, checkAnswer, showAnswer, evaluation, validation } = this.props;

    let newElems = elements;

    if (checkAnswer) {
      if (evaluation && evaluation.length) {
        const compareResult = getCompareResult(evaluation);
        newElems = getColoredElems(elements, compareResult);
      } else {
        const compareResult = getCompareResult(
          checkAnswerMethod({
            userResponse: elements,
            validation
          })
        );
        newElems = getColoredElems(elements, compareResult);
      }
    } else if (showAnswer) {
      const compareResult = getCompareResult(
        checkAnswerMethod({
          userResponse: elements,
          validation
        })
      );
      newElems = getColoredElems(elements, compareResult);
    }

    this._graph.loadFromConfig(newElems);
  };

  getIconByToolName = (toolName, options) => {
    if (!toolName) {
      return "";
    }

    const { width, height } = options;

    const iconsByToolName = {
      point: () => <IconPoint {...options} />,
      line: () => {
        const newOptions = {
          ...options,
          width: width + 10,
          height: height + 5
        };

        return <IconLine {...newOptions} />;
      },
      ray: () => {
        const newOptions = {
          ...options,
          width: width + 10,
          height: height + 5
        };

        return <IconRay {...newOptions} />;
      },
      segment: () => {
        const newOptions = {
          ...options,
          width: width + 10,
          height: height + 5
        };

        return <IconSegment {...newOptions} />;
      },
      vector: () => {
        const newOptions = {
          ...options,
          width: width + 10,
          height: height + 5
        };

        return <IconVector {...newOptions} />;
      },
      circle: () => <IconCircle {...options} />,
      parabola: () => <IconParabola {...options} />,
      sine: () => {
        const newOptions = {
          ...options,
          width: width + 10
        };

        return <IconSine {...newOptions} />;
      },
      polygon: () => <IconPolygon {...options} />,
      mark: () => <IconLabel {...options} />,
      label: () => {
        const newOptions = {
          ...options,
          width: width + 10,
          height: height - 2
        };

        return <IconLabel {...newOptions} />;
      }
    };

    return iconsByToolName[toolName]();
  };

  allTools = ["point", "line", "ray", "segment", "vector", "circle", "sine", "polygon", "parabola", "label"];

  allControls = ["undo", "redo", "reset"];

  render() {
    const { tools, layout, annotation, controls, shapes } = this.props;
    const { selectedTool } = this.state;
    const hasAnnotation =
      annotation && (annotation.labelTop || annotation.labelLeft || annotation.labelRight || annotation.labelBottom);
    return (
      <div data-cy="axis-quadrants-container" style={{ overflow: "auto", width: "100%" }}>
        <GraphWrapper>
          {annotation && annotation.title && <Title dangerouslySetInnerHTML={{ __html: annotation.title }} />}
          <Tools
            tools={shapes ? this.allTools : tools}
            controls={shapes ? this.allControls : controls}
            tool={selectedTool}
            shapes={shapes}
            getIconByToolName={this.getIconByToolName}
            getHandlerByControlName={this.getHandlerByControlName}
            onSelect={this.onSelectTool}
            onReset={this.onReset}
            fontSize={shapes ? 12 : layout.fontSize}
          />
          <div
            style={{
              position: "relative",
              overflow: "auto",
              width: layout.width + 40 + "px"
            }}
          >
            {annotation && annotation.labelTop && (
              <LabelTop dangerouslySetInnerHTML={{ __html: annotation.labelTop }} />
            )}
            {annotation && annotation.labelRight && (
              <LabelRight dangerouslySetInnerHTML={{ __html: annotation.labelRight }} />
            )}
            {annotation && annotation.labelLeft && (
              <LabelLeft dangerouslySetInnerHTML={{ __html: annotation.labelLeft }} />
            )}
            {annotation && annotation.labelBottom && (
              <LabelBottom dangerouslySetInnerHTML={{ __html: annotation.labelBottom }} />
            )}
            <JSXBox
              data-cy="jxgbox"
              id={this._graphId}
              className="jxgbox"
              margin={layout.margin ? layout.margin : hasAnnotation ? 20 : 0}
            />
          </div>
        </GraphWrapper>
      </div>
    );
  }
}

GraphContainer.propTypes = {
  canvas: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  pointParameters: PropTypes.object.isRequired,
  xAxesParameters: PropTypes.object.isRequired,
  yAxesParameters: PropTypes.object.isRequired,
  gridParams: PropTypes.object.isRequired,
  bgImgOptions: PropTypes.object.isRequired,
  backgroundShapes: PropTypes.object,
  evaluation: PropTypes.any,
  tools: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired,
  showAnswer: PropTypes.bool,
  checkAnswer: PropTypes.bool,
  changePreviewTab: PropTypes.func
};

GraphContainer.defaultProps = {
  backgroundShapes: { values: [], showPoints: true },
  evaluation: null,
  showAnswer: false,
  checkAnswer: false,
  changePreviewTab: () => {}
};

export default GraphContainer;
