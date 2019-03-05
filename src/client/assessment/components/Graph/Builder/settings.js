import { tickLabel } from "./utils";

/**
 * Graph parameters
 * [x1, y1, x2, y2]
 * @see https://jsxgraph.org/docs/symbols/JXG.Board.html#boundingbox
 */

const graphParameters = {
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10
};

const pointParameters = {
  /**
   * @see https://jsxgraph.org/docs/symbols/Point.html#showInfobox
   */
  showInfoBox: false,
  /**
   * @see https://jsxgraph.org/docs/symbols/Point.html#snapToGrid
   */
  snapToGrid: true,
  /**
   * @see https://jsxgraph.org/docs/symbols/JXG.GeometryElement.html#withLabel
   */
  withLabel: false,
  /**
   * @see https://jsxgraph.org/docs/symbols/Point.html#snapSizeX
   */
  snapSizeX: 1,
  /**
   * @see https://jsxgraph.org/docs/symbols/Point.html#snapSizeY
   */
  snapSizeY: 1
};

const axesParameters = {
  /**
   * @see https://jsxgraph.org/docs/symbols/Ticks.html#ticksDistance
   */
  ticksDistance: 1,
  name: "",
  /**
   * @see https://jsxgraph.org/docs/symbols/Ticks.html#majorHeight
   */
  showTicks: true,
  /**
   * @see https://jsxgraph.org/docs/symbols/Ticks.html#drawLabels
   */
  drawLabels: true,
  /**
   * @see https://jsxgraph.org/docs/symbols/Line.html#firstArrow
   * @see https://jsxgraph.org/docs/symbols/JXG.GeometryElement.html#setArrow
   */
  maxArrow: true,
  /**
   * @see https://jsxgraph.org/docs/symbols/Line.html#lastArrow
   * @see https://jsxgraph.org/docs/symbols/JXG.GeometryElement.html#setArrow
   */
  minArrow: true,
  /**
   * @see https://jsxgraph.org/docs/symbols/Ticks.html#generateLabelText
   */
  commaInLabel: false,
  /**
   * @see https://jsxgraph.org/docs/symbols/Ticks.html#drawZero
   */
  drawZero: true
};

const gridParameters = {
  /**
   * special grid options
   * @see https://jsxgraph.org/docs/symbols/src/src_options.js.html
   */
  gridX: 1,
  /**
   * special grid options
   * @see https://jsxgraph.org/docs/symbols/src/src_options.js.html
   */
  gridY: 1
};

const bgObjectParameters = {
  fillColor: "#ccc",
  strokeColor: "#ccc",
  fixed: true,
  highlightFillOpacity: 1,
  highlightStrokeColor: "#ccc",
  highlightFillColor: "#ccc"
};

const bgImageParameters = {
  urlImg: "",
  coords: [0, 0],
  size: [100, 100],
  opacity: 0.5
};

const inputParameters = {
  offset: [0, 10],
  anchorX: "middle",
  anchorY: "bottom",
  cssClass: "myLabelInput",
  highlightCssClass: "myLabelInput",
  fixed: true,
  highlightFillOpacity: 1,
  highlightStrokeOpacity: 1
};

const textParameters = {
  display: "html",
  fontSize: 12,
  cssClass: "mark",
  highlightCssClass: "mark"
};

export const defaultInputParameters = () => ({ ...inputParameters });

export const defaultTextParameters = () => ({ ...textParameters });

export const defaultBgImageParameters = () => ({ ...bgImageParameters });

export const graphParameters2Boundingbox = p => [p.xMin, p.yMax, p.xMax, p.yMin];

export const numberlineGraphParametersToBoundingbox = (coords, margin) => [
  coords.xMin - margin,
  coords.yMax,
  coords.xMax + margin,
  coords.yMin
];

export const defaultBgObjectParameters = () => ({ ...bgObjectParameters });

export const defaultAxesParameters = () => ({ ...axesParameters });

export const defaultGraphParameters = () => ({ ...graphParameters });

export const defaultPointParameters = () => ({ ...pointParameters });

export const defaultGridParameters = () => ({ ...gridParameters });

function mergeAxesParameters(target, parameters) {
  if (parameters.x.ticksDistance) {
    target.x.ticks.ticksDistance = parseFloat(parameters.x.ticksDistance);
  }
  if (parameters.y.ticksDistance) {
    target.y.ticks.ticksDistance = parseFloat(parameters.y.ticksDistance);
  }
  if (parameters.x.name) {
    target.x.withLabel = true;
    target.x.name = parameters.x.name;
  }
  if (parameters.y.name) {
    target.y.withLabel = true;
    target.y.name = parameters.y.name;
  }
  if ("showTicks" in parameters.x && parameters.x.showTicks === false) {
    target.x.ticks.majorHeight = 0;
  }
  if ("showTicks" in parameters.y && parameters.y.showTicks === false) {
    target.y.ticks.majorHeight = 0;
  }
  if ("drawLabels" in parameters.x) {
    target.x.ticks.drawLabels = parameters.x.drawLabels;
  }
  if ("drawLabels" in parameters.y) {
    target.y.ticks.drawLabels = parameters.x.drawLabels;
  }
  if ("minArrow" in parameters.x && parameters.x.minArrow === false) {
    target.x.firstArrow = false;
  }
  if ("minArrow" in parameters.y && parameters.y.minArrow === false) {
    target.y.firstArrow = false;
  }
  if ("maxArrow" in parameters.x && parameters.x.maxArrow === false) {
    target.x.lastArrow = false;
  }
  if ("maxArrow" in parameters.y && parameters.y.maxArrow === false) {
    target.y.lastArrow = false;
  }
  if ("gridX" in parameters) {
    target.grid.gridX = parameters.gridX;
  }
  if ("gridY" in parameters) {
    target.grid.gridY = parameters.gridY;
  }
  if ("commaInLabel" in parameters.x) {
    target.x.ticks.generateLabelText = tickLabel("x", parameters.x.commaInLabel);
  }
  if ("commaInLabel" in parameters.y) {
    target.y.ticks.generateLabelText = tickLabel("y", parameters.y.commaInLabel);
  }
  if ("drawZero" in parameters.x && parameters.x.drawZero === false) {
    target.x.ticks.drawZero = false;
  }
}

export function mergeParams(defaultConfig, userConfig) {
  if (userConfig.graphParameters) {
    defaultConfig.boundingbox = graphParameters2Boundingbox(userConfig.graphParameters);
  }
  if (userConfig.axesParameters) {
    mergeAxesParameters(defaultConfig.defaultaxes, userConfig.axesParameters);
  }
  if ("gridParameters" in userConfig) {
    defaultConfig.grid = {
      ...defaultConfig.grid,
      ...userConfig.gridParameters
    };
  }
  return defaultConfig;
}

export function fillConfigDefaultParameters(config) {
  if (!config.graphParameters) {
    config.graphParameters = defaultGraphParameters();
  }
  if (!config.pointParameters) {
    config.pointParameters = defaultPointParameters();
  }
  if (!config.axesParameters) {
    config.axesParameters = {
      x: defaultAxesParameters(),
      y: defaultAxesParameters()
    };
  }
  if (!config.gridParameters) {
    config.gridParameters = defaultGridParameters();
  }
  return config;
}
