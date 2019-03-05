import getDefaultConfig, { CONSTANT, Colors } from "./config";
import {
  Point,
  Line,
  Circle,
  Sin,
  Polygon,
  Parabola,
  Label,
  Input,
  Mark,
  Numberline,
  NumberlinePoint,
  NumberlineVector,
  NumberlineSegment,
  NumberlineTrash,
  Title
} from "./elements";
import {
  mergeParams,
  graphParameters2Boundingbox,
  defaultBgObjectParameters,
  fillConfigDefaultParameters,
  numberlineGraphParametersToBoundingbox
} from "./settings";
import {
  updatePointParameters,
  updateAxe,
  updateNumberline,
  updateGrid,
  getImageCoordsByPercent,
  flatConfig,
  flat2nestedConfig,
  checkMarksRenderSpace,
  calcMeasure,
  calcUnitX,
  findElementsDiff
} from "./utils";
import _events from "./events";

import "../common/MyLabelInput.css";
import "../common/Mark.css";

// export const JXG = window.JXG;

/**
 * if the coords between mousedown and mouseup events are different - is it move
 */
function dragDetector() {
  const start = {
    x: 0,
    y: 0
  };
  return {
    start(coords) {
      [start.x, start.y] = coords;
    },
    isSame(coords) {
      return start.x === coords[0] && start.y === coords[1];
    }
  };
}

/**
 * @see https://jsxgraph.org/docs/symbols/JXG.JSXGraph.html#.initBoard
 */
class Board {
  constructor(id, config = {}, setAnswers = null) {
    /**
     * Elements on the board
     */
    this.elements = [];
    /**
     * Bg elements on the board
     */
    this.bgElements = [];
    /**
     * Static unitX
     */
    this.staticUnitX = null;
    /**
     * Answers
     */
    this.answers = [];
    /**
     * Bg image
     */
    this.bgImage = null;
    /**
     * Board settings
     */
    this.parameters = fillConfigDefaultParameters(config);
    /**
     * Current tool
     */
    this.currentTool = null;

    this.stackResponses = false;

    this.stackResponsesSpacing = 30;

    this.responsesAllowed = 2;

    this.setAnswers = setAnswers;

    this.dragDetector = dragDetector();

    this.events = _events();

    this.$board = window.JXG.JSXGraph.initBoard(id, mergeParams(getDefaultConfig(), this.parameters));
    this.$board.setZoom(1, 1);
    this.$board.on(CONSTANT.EVENT_NAMES.DOWN, () => {
      this.dragDetector.start(this.$board.drag_position);
    });
  }

  /**
   * Assign element handler by const
   * Constants/Tools
   * @param {string} tool
   */
  setTool(tool, graphType, responsesAllowed) {
    if (graphType === "axisLabels") {
      return;
    }
    if (this.currentTool !== tool) {
      if (!graphType === "axisSegments") {
        this.abortTool();
      }
    }
    this.$board.off(CONSTANT.EVENT_NAMES.UP);
    this.currentTool = tool;
    switch (tool) {
      case CONSTANT.TOOLS.POINT:
        this.setCreatingHandler(Point.onHandler, responsesAllowed);
        return;
      case CONSTANT.TOOLS.LINE:
      case CONSTANT.TOOLS.RAY:
      case CONSTANT.TOOLS.SEGMENT:
      case CONSTANT.TOOLS.VECTOR:
        this.setCreatingHandler(Line.onHandler(tool));
        return;
      case CONSTANT.TOOLS.CIRCLE:
        this.setCreatingHandler(Circle.onHandler());
        return;
      case CONSTANT.TOOLS.SIN:
        this.setCreatingHandler(Sin.onHandler());
        return;
      case CONSTANT.TOOLS.POLYGON:
        this.setCreatingHandler(Polygon.onHandler());
        return;
      case CONSTANT.TOOLS.PARABOLA:
        this.setCreatingHandler(Parabola.onHandler());
        return;
      case CONSTANT.TOOLS.LABEL:
        this.setCreatingHandler(Label.onHandler());
        return;
      case CONSTANT.TOOLS.MARK:
        this.setCreatingHandler(Mark.onHandler());
        return;
      case CONSTANT.TOOLS.SEGMENTS_POINT:
        this.setCreatingHandler(
          NumberlinePoint.onHandler(this.stackResponses, this.stackResponsesSpacing),
          responsesAllowed
        );
        return;
      case CONSTANT.TOOLS.BOTH_INCLUDED_SEGMENT:
      case CONSTANT.TOOLS.BOTH_NOT_INCLUDED_SEGMENT:
      case CONSTANT.TOOLS.ONLY_RIGHT_INCLUDED_SEGMENT:
      case CONSTANT.TOOLS.ONLY_LEFT_INCLUDED_SEGMENT:
        this.setCreatingHandler(
          NumberlineSegment.onHandler(tool, this.stackResponses, this.stackResponsesSpacing, this.setAnswers),
          responsesAllowed
        );
        return;
      case CONSTANT.TOOLS.INFINITY_TO_INCLUDED_SEGMENT:
      case CONSTANT.TOOLS.INFINITY_TO_NOT_INCLUDED_SEGMENT:
      case CONSTANT.TOOLS.INCLUDED_TO_INFINITY_SEGMENT:
      case CONSTANT.TOOLS.NOT_INCLUDED_TO_INFINITY_SEGMENT:
        this.setCreatingHandler(
          NumberlineVector.onHandler(tool, this.stackResponses, this.stackResponsesSpacing),
          responsesAllowed
        );
        return;
      case CONSTANT.TOOLS.TRASH:
        this.setCreatingHandler();
        return;
      default:
        throw new Error("Unknown tool:", tool);
    }
  }

  abortTool() {
    switch (this.currentTool) {
      case CONSTANT.TOOLS.POINT:
        break;
      case CONSTANT.TOOLS.LINE:
      case CONSTANT.TOOLS.RAY:
      case CONSTANT.TOOLS.SEGMENT:
      case CONSTANT.TOOLS.VECTOR:
        Line.abort(points => points.map(this.removeObject.bind(this)));
        break;
      case CONSTANT.TOOLS.CIRCLE:
        Circle.abort(points => points.map(this.removeObject.bind(this)));
        break;
      case CONSTANT.TOOLS.POLYGON:
        Polygon.abort(points => points.map(this.removeObject.bind(this)));
        break;
      case CONSTANT.TOOLS.SIN:
        Sin.abort(points => points.map(this.removeObject.bind(this)));
        break;
      case CONSTANT.TOOLS.PARABOLA:
        Parabola.abort(points => points.map(this.removeObject.bind(this)));
        break;
      default:
        break;
    }
  }

  /**
   * Add event 'Up'
   * @param {Function} handler
   */
  setCreatingHandler(handler, responsesAllowed) {
    this.$board.on(CONSTANT.EVENT_NAMES.UP, event => {
      if (!this.dragDetector.isSame(this.$board.drag_position)) {
        this.events.emit(CONSTANT.EVENT_NAMES.CHANGE_MOVE);
        return;
      }
      if (this.currentTool === CONSTANT.TOOLS.TRASH) {
        NumberlineTrash.removeObject(this, this.$board.getAllObjectsUnderMouse(event), this.setAnswers);
      } else {
        let newElement;

        if (responsesAllowed) {
          const elementsLength = this.elements.filter(
            element => element.elType === "segment" || element.elType === "point"
          ).length;
          if (elementsLength < responsesAllowed) {
            newElement = handler(this, event);
          }
        } else {
          newElement = handler(this, event);
        }

        if (newElement) {
          this.elements.push(newElement);
          this.events.emit(CONSTANT.EVENT_NAMES.CHANGE_NEW);
        }
      }
    });
  }

  updateStackSettings(stackResponses, stackResponsesSpacing, responsesAllowed) {
    if (
      this.stackResponses !== stackResponses ||
      this.responsesAllowed !== responsesAllowed ||
      this.stackResponsesSpacing !== stackResponsesSpacing
    ) {
      NumberlineTrash.cleanBoard(this, this.setAnswers);
    }

    if (stackResponses && responsesAllowed > 0 && stackResponsesSpacing > 0) {
      const newHeight = 150 + responsesAllowed * stackResponsesSpacing;
      this.resizeContainer(this.$board.canvasWidth, newHeight);
    }

    if (stackResponsesSpacing < 1 || !stackResponses) {
      this.resizeContainer(this.$board.canvasWidth, 150);
    }

    this.stackResponses = stackResponses;
    this.stackResponsesSpacing = stackResponsesSpacing;
    this.responsesAllowed = responsesAllowed;
  }

  // Set calculated bounding box (xMin - margin and xMax + margin), render numberline axis
  makeNumberlineAxis(graphParameters, settings, layout, graphType, lineSettings, containerSettings) {
    Object.values(this.$board.defaultAxes).forEach(axis => this.$board.removeObject(axis));
    const xMargin = graphParameters.margin / calcUnitX(graphParameters.xMin, graphParameters.xMax, layout.width);

    this.$board.setBoundingBox(numberlineGraphParametersToBoundingbox(graphParameters, xMargin));
    this.elements.push(Numberline.onHandler(this, graphParameters.xMin, graphParameters.xMax, settings, lineSettings));

    if (graphType === "axisLabels") {
      Mark.updateMarksContainer(
        this,
        graphParameters.xMin - xMargin,
        graphParameters.xMax + xMargin,
        containerSettings
      );
    }
  }

  // Update bounding box, marks container, rerender numberline axis, update mark's snap handler
  updateGraphParameters(graphParameters, settings, layout, graphType, setValue, lineSettings, containerSettings) {
    console.log("updateGraphParameters this.elements ", this.elements);
    console.log("graphType", graphType);
    const xMargin = graphParameters.margin / calcUnitX(graphParameters.xMin, graphParameters.xMax, layout.width);
    this.$board.setBoundingBox(numberlineGraphParametersToBoundingbox(graphParameters, xMargin));

    Numberline.updateCoords(this, graphParameters.xMin, graphParameters.xMax, settings, lineSettings);

    if (graphType === "axisLabels") {
      Mark.updateMarksContainer(
        this,
        graphParameters.xMin - xMargin,
        graphParameters.xMax + xMargin,
        containerSettings
      );

      const marks = this.elements.filter(element => element.elType === "group");
      this.elements = this.elements.filter(element => element.elType !== "group");
      marks.forEach(mark => Mark.removeMark(this, mark));
      marks.forEach(mark =>
        Mark.rerenderMark(mark, this, graphParameters, settings, setValue, lineSettings, containerSettings)
      );
    }

    if (graphType === "axisSegments") {
      const points = this.elements.filter(element => element.elType === "point");
      console.log("graphType === axisSegments points", points);
      this.elements = this.elements.filter(element => element.elType !== "point");

      points.forEach(p => this.removeObject(p));
      points.forEach(p => {
        console.log("p", p);
        const newPoint = NumberlinePoint.onHandler(this.stackResponses, this.stackResponsesSpacing)(this, p.X());
        console.log("newPoint", newPoint);
        this.elements.push(newPoint);
      });
      console.log("graphType === axisSegments this.elements", this.elements);
    }

    if (graphType === "axisSegments") {
      const points = this.elements.filter(element => element.elType === "point");
      console.log("graphType === axisSegments points", points);
      this.elements = this.elements.filter(element => element.elType !== "point");

      points.forEach(p => this.removeObject(p));
      points.forEach(p => {
        console.log("p", p);
        const newPoint = NumberlinePoint.onHandler(this.stackResponses, this.stackResponsesSpacing)(this, p.X());
        console.log("newPoint", newPoint);
        this.elements.push(newPoint);
      });
      console.log("graphType === axisSegments this.elements", this.elements);
    }

    this.$board.fullUpdate();
  }

  // Update numberline axis settings (such as ticks visibility, font size and etc.)
  updateGraphSettings(settings, graphType) {
    const axis = this.elements.filter(element => element.elType === "axis" || element.elType === "arrow");
    updateNumberline(axis, settings);

    if (graphType === "axisLabels") {
      const marks = this.elements.filter(element => element.elType === "group");
      marks.forEach(mark => Mark.updateTextSize(mark, settings.fontSize));
    }

    this.$board.fullUpdate();
  }

  // Render marks
  renderMarks(marks, xCoords, settings, setValue, lineSettings, containerSettings) {
    marks.forEach(mark => {
      this.elements.push(
        Mark.onHandler(
          this,
          checkMarksRenderSpace(this, settings, containerSettings),
          mark,
          calcMeasure(51.5, 45, this),
          xCoords,
          settings.snapToTicks,
          settings.ticksDistance,
          setValue,
          lineSettings,
          containerSettings
        )
      );
    });
  }

  // Marks shuffled or text edited
  updateMarks(marks, oldMarks, containerSettings) {
    Mark.checkForUpdate(
      marks,
      this.elements.filter(element => element.elType === "group"),
      this,
      oldMarks,
      containerSettings
    );
  }

  // Size of marks array have changed
  marksSizeChanged(marks, xCoords, settings, setValue, lineSettings, containerSettings) {
    const filteredElements = this.elements.filter(element => element.elType === "group");

    if (marks.length < filteredElements.length) {
      this.removeMark(marks, filteredElements);
    } else {
      this.addMark(marks, filteredElements, xCoords, setValue, lineSettings, containerSettings, settings);
    }
  }

  // Add new mark
  addMark(marks, elements, xCoords, setValue, lineSettings, containerSettings, settings) {
    const newMark = findElementsDiff(marks, elements);
    this.elements.push(
      Mark.onHandler(
        this,
        checkMarksRenderSpace(this, settings, containerSettings),
        newMark,
        calcMeasure(51.5, 45, this),
        xCoords,
        settings.snapToTicks,
        settings.ticksDistance,
        setValue,
        lineSettings,
        containerSettings
      )
    );
    this.$board.fullUpdate();
  }

  // Remove mark
  removeMark(marks, elements) {
    const removedMark = findElementsDiff(elements, marks);
    this.elements = this.elements.filter(element => element.elType !== "group" || element.id !== removedMark.id);
    Mark.removeMark(this, removedMark);
    this.$board.fullUpdate();
  }

  renderTitle(title) {
    this.elements.push(Title.renderTitle(this, title));
    this.$board.fullUpdate();
  }

  updateTitle(title) {
    Title.updateTitle(this, title);
    this.$board.fullUpdate();
  }

  getCoords(e) {
    // index of the finger that is used to extract the coordinates
    const i = e[window.JXG.touchProperty] ? 1 : 0;
    const pos = i ? this.$board.getMousePosition(e) : this.$board.getMousePosition(e, 0);

    return new window.JXG.Coords(window.JXG.COORDS_BY_SCREEN, [pos[0], pos[1]], this.$board);
  }

  /**
   *
   *@see https://jsxgraph.org/docs/symbols/JXG.Board.html#create
   */
  createElement(...newElement) {
    return this.$board.create(...newElement);
  }

  /**
   * @see https://jsxgraph.org/docs/symbols/JXG.Board.html#removeObject
   */
  segmentsReset() {
    const elementsToDelete = this.elements.filter(element => element.elType !== "axis" && "arrow");
    const numberlineAxis = this.elements.filter(element => element.elType === "axis" || element.elType === "arrow");

    elementsToDelete.map(this.removeObject.bind(this));
    this.elements = [];
    this.elements.push(numberlineAxis[0]);
  }

  reset() {
    this.abortTool();
    this.elements.map(this.removeObject.bind(this));
    this.elements = [];
  }

  resetBg() {
    this.bgElements.map(this.removeObject.bind(this));
    this.bgElements = [];
  }

  removeObject(obj) {
    if (typeof obj === "string") {
      this.$board.removeObject(obj);
    } else if (obj.elType !== "point") {
      obj.getParents().map(this.removeObject.bind(this));
      if (obj.elType === "curve") this.$board.removeObject(obj);
    } else {
      this.$board.removeObject(obj);
    }
  }

  /**
   * @see https://jsxgraph.org/docs/symbols/src/src_base_constants.js.html
   */
  getConfig() {
    this.abortTool();
    const config = this.elements.map(e => {
      switch (e.type) {
        case window.JXG.OBJECT_TYPE_POINT:
          return Point.getConfig(e);
        case window.JXG.OBJECT_TYPE_LINE:
          return Line.getConfig(e);
        case window.JXG.OBJECT_TYPE_CIRCLE:
          return Circle.getConfig(e);
        case window.JXG.OBJECT_TYPE_POLYGON:
          return Polygon.getConfig(e);
        case window.JXG.OBJECT_TYPE_CURVE:
          return Parabola.getConfig(e);
        case window.JXG.OBJECT_TYPE_TEXT:
          return Mark.getConfig(e);
        default:
          throw new Error("Unknown element type:", e.name, e.type);
      }
    });
    const flatCfg = Object.values(flatConfig(config));
    console.log(JSON.stringify(flatCfg, null, 2));
    return flatCfg;
  }

  getMarks() {
    return this.elements.filter(element => element.elType === "group").map(group => Mark.getConfig(group));
  }

  getSegments() {
    return this.elements
      .filter(element => element.elType === "segment" || element.elType === "point")
      .map(element => {
        switch (element.segmentType) {
          case CONSTANT.TOOLS.SEGMENTS_POINT:
            return NumberlinePoint.getConfig(element);
          case CONSTANT.TOOLS.BOTH_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.BOTH_NOT_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.ONLY_RIGHT_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.ONLY_LEFT_INCLUDED_SEGMENT:
            return NumberlineSegment.getConfig(element);
          case CONSTANT.TOOLS.INFINITY_TO_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.INFINITY_TO_NOT_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.INCLUDED_TO_INFINITY_SEGMENT:
          case CONSTANT.TOOLS.NOT_INCLUDED_TO_INFINITY_SEGMENT:
            return NumberlineVector.getConfig(element);
          default:
            break;
        }
      });
  }

  // settings

  getParameters(name) {
    switch (name) {
      case CONSTANT.TOOLS.POINT:
        return this.parameters.pointParameters;
      default:
    }
  }

  /**
   * settings::pointParameters
   */
  setPointParameters(pointParameters) {
    const isSwitchToGrid =
      this.parameters.pointParameters && !this.parameters.pointParameters.snapToGrid && pointParameters.snapToGrid;
    updatePointParameters(this.elements, pointParameters, isSwitchToGrid);
    this.parameters.pointParameters = {
      ...this.parameters.pointParameters,
      ...pointParameters
    };
    this.$board.fullUpdate();
  }

  /**
   * settings::axesParameters
   */
  setAxesParameters(axesParameters) {
    const axes = this.$board.defaultAxes;

    if (axesParameters.x) {
      updateAxe(axes.x, axesParameters.x, "x");
    }
    if (axesParameters.y) {
      updateAxe(axes.y, axesParameters.y, "y");
    }

    this.$board.fullUpdate();
  }

  /**
   * graphParameters
   * settings::graphParameters
   * @see https://jsxgraph.org/docs/symbols/JXG.Board.html#setBoundingBox
   */
  setGraphParameters(graphParameters) {
    this.$board.setBoundingBox(graphParameters2Boundingbox(graphParameters));
  }

  /**
   * gridParameters
   * settings::graphParameters
   * @see https://jsxgraph.org/docs/symbols/JXG.Board.html#setBoundingBox
   */
  setGridParameters(gridParameters) {
    updateGrid(this.$board.grids, gridParameters);
    this.$board.fullUpdate();
  }

  /**
   *
   * @see https://jsxgraph.org/docs/symbols/JXG.Board.html#resizeContainer
   */
  resizeContainer(canvasWidth, canvasHeight) {
    this.$board.resizeContainer(canvasWidth, canvasHeight);
  }

  setBgObjects(flatCfg, showPoints = true) {
    const config = flat2nestedConfig(flatCfg);
    const objectOptions = {
      [CONSTANT.TOOLS.POINT]: {
        ...defaultBgObjectParameters(),
        visible: showPoints
      },
      [CONSTANT.TOOLS.LINE]: {
        ...defaultBgObjectParameters()
      },
      [CONSTANT.TOOLS.RAY]: {
        ...defaultBgObjectParameters()
      },
      [CONSTANT.TOOLS.SEGMENT]: {
        ...defaultBgObjectParameters()
      },
      [CONSTANT.TOOLS.VECTOR]: {
        ...defaultBgObjectParameters()
      },
      [CONSTANT.TOOLS.CIRCLE]: {
        ...defaultBgObjectParameters(),
        ...Circle.parseConfig()
      },
      [CONSTANT.TOOLS.POLYGON]: {
        ...defaultBgObjectParameters(),
        ...Polygon.parseConfig(),
        borders: defaultBgObjectParameters()
      },
      [CONSTANT.TOOLS.PARABOLA]: {
        ...defaultBgObjectParameters(),
        fillColor: "transparent",
        highlightFillColor: "transparent",
        highlightStrokeWidth: 1
      },
      [CONSTANT.TOOLS.SIN]: {
        ...defaultBgObjectParameters(),
        fillColor: "transparent",
        highlightFillColor: "transparent",
        highlightStrokeWidth: 1
      }
    };
    this.bgElements.push(
      ...this.loadObjects(config, ({ objectCreator, el }) => {
        const { _type, colors = {} } = el;
        let type;
        if (_type === window.JXG.OBJECT_TYPE_CURVE) {
          type = el.type === CONSTANT.TOOLS.PARABOLA ? CONSTANT.TOOLS.PARABOLA : CONSTANT.TOOLS.SIN;
        } else {
          ({ type } = el);
        }
        return objectCreator({
          ...objectOptions[type],
          ...colors
        });
      })
    );
  }

  loadMarksAnswers(marks) {
    if (marks) {
      this.answers.push(marks.map(config => Mark.renderMarkAnswer(this, config, calcMeasure(51.5, 45, this))));
    }
  }

  loadSegmentsAnswers(segments) {
    this.answers.push(
      segments.map(segment => {
        switch (segment.type) {
          case CONSTANT.TOOLS.SEGMENTS_POINT:
            return NumberlinePoint.renderAnswer(this, segment);
          case CONSTANT.TOOLS.BOTH_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.BOTH_NOT_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.ONLY_RIGHT_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.ONLY_LEFT_INCLUDED_SEGMENT:
            return NumberlineSegment.determineAnswerType(this, segment);
          case CONSTANT.TOOLS.INFINITY_TO_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.INFINITY_TO_NOT_INCLUDED_SEGMENT:
          case CONSTANT.TOOLS.INCLUDED_TO_INFINITY_SEGMENT:
          case CONSTANT.TOOLS.NOT_INCLUDED_TO_INFINITY_SEGMENT:
            return NumberlineVector.determineAnswerType(this, segment);
          default:
            break;
        }
      })
    );
  }

  loadFromConfig(flatCfg) {
    const config = flat2nestedConfig(flatCfg);
    this.elements.push(
      ...this.loadObjects(config, ({ objectCreator, el }) => {
        const newElement = objectCreator({
          ...Colors.default[
            (type => {
              if (
                type === CONSTANT.TOOLS.LINE ||
                type === CONSTANT.TOOLS.RAY ||
                type === CONSTANT.TOOLS.SEGMENT ||
                type === CONSTANT.TOOLS.VECTOR
              ) {
                return CONSTANT.TOOLS.LINE;
              }
              return type;
            })(el.type)
          ],
          ...el.colors
        });
        if (el.label) {
          newElement.setLabel(el.label);
          Input(newElement).sub();
        }
        return newElement;
      })
    );
  }

  setAnswer(flatCfg) {
    const config = flat2nestedConfig(flatCfg);
    this.answers.push(
      ...this.loadObjects(config, ({ objectCreator, el }) =>
        objectCreator({
          ...el.colors,
          fixed: true
        })
      )
    );
  }

  /**
   *
   * @param {array} objects
   * @see getConfig
   */
  loadObjects(objectArray, mixProps) {
    const objects = [];
    objectArray.forEach(el => {
      switch (el._type) {
        case window.JXG.OBJECT_TYPE_POINT:
          objects.push(
            mixProps({
              el,
              objectCreator: attrs => {
                const [name, points, props] = Point.parseConfig(el, this.getParameters(CONSTANT.TOOLS.POINT));
                return this.createElement(name, points, {
                  ...props,
                  ...attrs,
                  visible: true
                });
              }
            })
          );
          break;
        case window.JXG.OBJECT_TYPE_LINE:
          objects.push(
            mixProps({
              el,
              objectCreator: attrs =>
                this.createElement(
                  "line",
                  [
                    mixProps({
                      el: el.points[0],
                      objectCreator: attributes => this.createPointFromConfig(el.points[0], attributes)
                    }),
                    mixProps({
                      el: el.points[1],
                      objectCreator: attributes => this.createPointFromConfig(el.points[1], attributes)
                    })
                  ],
                  {
                    ...Line.parseConfig(el.type),
                    ...attrs
                  }
                )
            })
          );
          break;
        case window.JXG.OBJECT_TYPE_CIRCLE:
          objects.push(
            mixProps({
              el,
              objectCreator: attrs =>
                this.createElement(
                  "circle",
                  [
                    mixProps({
                      el: el.points[0],
                      objectCreator: attributes => this.createPointFromConfig(el.points[0], attributes)
                    }),
                    mixProps({
                      el: el.points[1],
                      objectCreator: attributes => this.createPointFromConfig(el.points[1], attributes)
                    })
                  ],
                  {
                    ...Circle.parseConfig(),
                    ...attrs
                  }
                )
            })
          );
          break;
        case window.JXG.OBJECT_TYPE_POLYGON:
          objects.push(
            mixProps({
              el,
              objectCreator: attrs =>
                this.createElement(
                  "polygon",
                  el.points.map(pointEl =>
                    mixProps({
                      el: pointEl,
                      objectCreator: attributes => this.createPointFromConfig(pointEl, attributes)
                    })
                  ),
                  {
                    ...Polygon.parseConfig(),
                    ...attrs
                  }
                )
            })
          );
          break;
        case window.JXG.OBJECT_TYPE_CURVE:
          objects.push(
            mixProps({
              el,
              objectCreator: attrs => {
                const [name, [makeFn, points], props] = [Parabola, Sin][
                  el.type === CONSTANT.TOOLS.PARABOLA ? 0 : 1
                ].parseConfig(
                  el.points.map(pointEl =>
                    mixProps({
                      el: pointEl,
                      objectCreator: attributes => this.createPointFromConfig(pointEl, attributes)
                    })
                  )
                );
                const newElem = this.createElement(name, makeFn(points), {
                  ...props,
                  ...attrs
                });
                newElem.ancestors = {
                  [points[0].id]: points[0],
                  [points[1].id]: points[1]
                };
                newElem.addParents(points);
                return newElem;
              }
            })
          );
          break;
        case window.JXG.OBJECT_TYPE_TEXT:
          objects.push(
            mixProps({
              el,
              objectCreator: attrs => {
                const [name, points, props] = Mark.parseConfig(el, this.getParameters(CONSTANT.TOOLS.MARK));
                console.log(name, points, props, attrs);
                return this.createElement(name, points, { ...props, ...attrs });
              }
            })
          );
        default:
          throw new Error("Unknown element:", el);
      }
    });
    return objects;
  }

  /**
   * Find point
   * @param {Object} el Point::getConfig
   * @param {Object} attrs provided attributes
   * @see Point::getConfig
   */
  createPointFromConfig(el, attrs) {
    const point = Point.findPoint(this.$board.objectsList, [1, el.x, el.y]);
    if (point && el.x !== 0 && el.y !== 0) {
      return point;
    }
    const [name, points, props] = Point.parseConfig(el, this.getParameters(CONSTANT.TOOLS.POINT));
    return this.createElement(name, points, { ...props, ...attrs });
  }

  /**
   * settings::bgImageParameters
   * @see https://jsxgraph.org/docs/symbols/Image.html
   */
  setBgImage(bgImageParameters) {
    const bgImage = this.createElement("image", [
      bgImageParameters.urlImg,
      ...getImageCoordsByPercent(this.parameters, bgImageParameters)
    ]);
    bgImage.setAttribute({
      fixed: true,
      highlightFillOpacity: bgImageParameters.opacity,
      opacity: bgImageParameters.opacity
    });
    this.bgImage = bgImage;
  }

  removeBgImage() {
    this.$board.removeObject(this.bgImage);
  }

  removeAnswers() {
    this.$board.removeObject(this.answers);
  }

  isDragMode() {
    return this.$board.mode === this.$board.BOARD_MODE_DRAG;
  }
}

export function makeBorder(id, config, setAnswers) {
  return new Board(id, config, setAnswers);
}

export default Board;
