import { Point } from ".";
import { getLineTypeByProp, getPropsByLineType } from "../utils";
import { Colors, CONSTANT } from "../config";

export const defaultConfig = {
  firstarrow: true,
  lastarrow: true
};

export const getLineLabelParameters = () => ({
  offset: [0, 10],
  position: "mdl",
  anchorX: "middle",
  anchorY: "bottom",
  cssClass: "myLabel",
  highlightCssClass: "myLabel"
});

let points = [];

function onLineHandler(type) {
  return (board, event) => {
    const newPoint = Point.onHandler(board, event);
    if (newPoint) {
      points.push(newPoint);
    }
    if (points.length === 2) {
      const newLine = board.$board.create("line", points, {
        ...getPropsByLineType(type),
        ...Colors.default[CONSTANT.TOOLS.LINE],
        label: getLineLabelParameters()
      });
      if (newLine) {
        points = [];
        return newLine;
      }
    }
  };
}

function getConfig(line) {
  return {
    _type: line.type,
    type: getLineTypeByProp(line.getAttributes()),
    id: line.id,
    label: line.hasLabel ? line.label.plaintext : false,
    points: Object.keys(line.ancestors)
      .sort()
      .map(n => Point.getConfig(line.ancestors[n]))
  };
}

function parseConfig(type) {
  return {
    ...getPropsByLineType(type),
    label: getLineLabelParameters()
  };
}

function abort(cb) {
  cb(points);
  points = [];
}

export default {
  onHandler(type) {
    return onLineHandler(type);
  },
  getConfig,
  parseConfig,
  abort
};
