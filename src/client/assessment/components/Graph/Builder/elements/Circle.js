import { Point } from ".";
import { CONSTANT, Colors } from "../config";

export const defaultConfig = {};

export const getCircleLabelParameters = () => ({
  offset: [0, 10],
  anchorX: "middle",
  anchorY: "bottom",
  cssClass: "myLabel",
  highlightCssClass: "myLabel"
});

let points = [];

function onHandler() {
  return (board, event) => {
    const newPoint = Point.onHandler(board, event);
    if (newPoint) {
      points.push(newPoint);
    }
    if (points.length === 2) {
      const newLine = board.$board.create("circle", points, {
        ...defaultConfig,
        ...Colors.default[CONSTANT.TOOLS.CIRCLE],
        label: getCircleLabelParameters()
      });
      if (newLine) {
        points = [];
        return newLine;
      }
    }
  };
}

function getConfig(circle) {
  return {
    _type: circle.type,
    type: CONSTANT.TOOLS.CIRCLE,
    id: circle.id,
    label: circle.hasLabel ? circle.label.plaintext : false,
    points: Object.keys(circle.ancestors)
      .sort()
      .map(n => Point.getConfig(circle.ancestors[n]))
  };
}

function parseConfig() {
  return {
    fillColor: "transparent",
    highlightFillColor: "transparent",
    label: getCircleLabelParameters()
  };
}

function abort(cb) {
  cb(points);
  points = [];
}

export default {
  onHandler,
  getConfig,
  parseConfig,
  abort
};
