import { Point } from ".";
import { CONSTANT, Colors } from "../config";
import { handleSnap } from "../utils";

export const defaultConfig = {
  type: CONSTANT.TOOLS.PARABOLA,
  fixed: false
};

export const getParabolaLabelParameters = () => ({
  offset: [0, 10],
  position: "mdl",
  anchorX: "middle",
  anchorY: "middle",
  cssClass: "myLabel",
  highlightCssClass: "myLabel"
});

const makeCallback = (p1, p2) => x => {
  const a = (1 / (p2.X() - p1.X()) ** 2) * (p2.Y() - p1.Y());
  return a * (x - p1.X()) ** 2 + p1.Y();
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
        ...Colors.default[CONSTANT.TOOLS.PARABOLA],
        label: getParabolaLabelParameters()
      });

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

function getConfig(parabola) {
  return {
    _type: parabola.type,
    type: parabola.getAttributes().type,
    id: parabola.id,
    label: parabola.hasLabel ? parabola.label.plaintext : false,
    points: Object.keys(parabola.ancestors)
      .sort()
      .map(n => Point.getConfig(parabola.ancestors[n]))
  };
}

function parseConfig(pointsConfig) {
  return [
    "functiongraph",
    [pointsArgument => makeCallback(...pointsArgument), pointsConfig],
    {
      ...defaultConfig,
      fillColor: "transparent",
      label: getParabolaLabelParameters()
    }
  ];
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
