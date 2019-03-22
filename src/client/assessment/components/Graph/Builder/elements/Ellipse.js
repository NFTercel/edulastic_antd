import { Point } from ".";
import { CONSTANT, Colors } from "../config";
import { handleSnap } from "../utils";

export const defaultConfig = { fixed: false };

export const getEllipseLabelParameters = () => ({
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
    if (points.length === 3) {
      const newLine = board.$board.create("ellipse", points, {
        ...defaultConfig,
        ...Colors.default[CONSTANT.TOOLS.CIRCLE],
        label: getEllipseLabelParameters()
      });
      handleSnap(newLine, points.filter(point => point.elType === "point"));
      if (newLine) {
        points = [];
        return newLine;
      }
    }
  };
}

function getConfig(ellipse) {
  return {
    _type: ellipse.type,
    type: CONSTANT.TOOLS.ELLIPSE,
    id: ellipse.id,
    label: ellipse.hasLabel ? ellipse.label.plaintext : false,
    points: Object.keys(ellipse.ancestors)
      .sort()
      .map(n => Point.getConfig(ellipse.ancestors[n]))
  };
}

function parseConfig() {
  return {
    fillColor: "transparent",
    highlightFillColor: "transparent",
    label: getEllipseLabelParameters()
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
