import { Point } from ".";
import { CONSTANT, Colors } from "../config";
import { handleSnap } from "../utils";

export const defaultConfig = {
  type: CONSTANT.TOOLS.EXPONENT,
  fixed: false
};

export const getExponentLabelParameters = () => ({
  offset: [0, 10],
  position: "mdl",
  anchorX: "middle",
  anchorY: "middle",
  cssClass: "myLabel",
  highlightCssClass: "myLabel"
});

const makeCallback = (p1, p2) => x => {
  const a = p1.Y();
  const b = p2.Y() - p1.Y();
  const c = p2.X() - p1.X() >= 0 ? p2.X() - p1.X() : 1 / (p1.X() - p2.X());
  const d = -p1.X();
  return a + (b / c) * Math.E ** (x + d);
};

let points = [];

function onHandler() {
  return (board, event) => {
    const newPoint = Point.onHandler(board, event);
    if (newPoint) {
      points.push(newPoint);
    }
    if (points.length === 2) {
      const newLine = board.$board.create("functiongraph", [makeCallback(...points)], {
        ...defaultConfig,
        ...Colors.default[CONSTANT.TOOLS.EXPONENT],
        label: getExponentLabelParameters()
      });
      newLine.type = 93;
      handleSnap(newLine, points);

      if (newLine) {
        newLine.addParents(points);
        newLine.ancestors = {
          [points[0].id]: points[0],
          [points[1].id]: points[1]
        };
        points = [];
        return newLine;
      }
    }
  };
}

function parseConfig(pointsConfig) {
  return [
    "functiongraph",
    [pointsArgument => makeCallback(...pointsArgument), pointsConfig],
    {
      ...defaultConfig,
      fillColor: "transparent",
      label: getExponentLabelParameters()
    }
  ];
}

function abort(cb) {
  cb(points);
  points = [];
}

export default {
  onHandler,
  parseConfig,
  abort
};
