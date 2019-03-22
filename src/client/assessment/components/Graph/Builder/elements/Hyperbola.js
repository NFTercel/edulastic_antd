import { Point } from ".";
import { CONSTANT, Colors } from "../config";
import { handleSnap } from "../utils";

export const defaultConfig = { fixed: false };

export const getHyperbolaLabelParameters = () => ({
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
      const newLine = board.$board.create("hyperbola", points, {
        ...defaultConfig,
        ...Colors.default[CONSTANT.TOOLS.HYPERBOLA],
        label: getHyperbolaLabelParameters()
      });
      newLine.type = 90;
      handleSnap(newLine, points.filter(point => point.elType === "point"));
      if (newLine) {
        points = [];
        return newLine;
      }
    }
  };
}

function getConfig(hyperbola) {
  return {
    _type: 90,
    type: CONSTANT.TOOLS.HYPERBOLA,
    id: hyperbola.id,
    label: hyperbola.hasLabel ? hyperbola.label.plaintext : false,
    points: Object.keys(hyperbola.ancestors)
      .sort()
      .map(n => Point.getConfig(hyperbola.ancestors[n]))
  };
}

function parseConfig() {
  return {
    fillColor: "transparent",
    highlightFillColor: "transparent",
    label: getHyperbolaLabelParameters()
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
