import { Point } from ".";
import { CONSTANT, Colors } from "../config";
import { handleSnap } from "../utils";

export const getPointLabelParameters = () => ({
  offset: [0, 10],
  anchorX: "middle",
  anchorY: "middle",
  cssClass: "myLabel",
  highlightCssClass: "myLabel"
});

export const defaultConfig = {
  hasInnerPoints: true,
  fixed: false
};

function isStart(point, coords) {
  const x = Math.round(coords[1]);
  const y = Math.round(coords[2]);
  return point.coords.usrCoords[1] === x && point.coords.usrCoords[2] === y;
}

const makeCallback = (...points) => x => {
  let result = 0;
  for (let i = 0; i < points.length; i++) {
    let li = 1;
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        li *= (x - points[j].X()) / (points[i].X() - points[j].X());
      }
    }
    result += points[i].Y() * li;
  }

  return result;
};

let points = [];

function onHandler() {
  return (board, event) => {
    if (points.length >= 1) {
      // handle closing polynom
      const coords = board.getCoords(event);
      if (isStart(points[0], coords.usrCoords)) {
        points[0].setAttribute(Colors.default[CONSTANT.TOOLS.POINT]);
        const newPolynom = board.$board.create("functiongraph", [makeCallback(...points)], {
          ...defaultConfig,
          ...Colors.default[CONSTANT.TOOLS.POLYNOM],
          label: getPointLabelParameters()
        });
        newPolynom.type = 95;
        handleSnap(newPolynom, points);

        if (newPolynom) {
          newPolynom.addParents(points);
          newPolynom.ancestors = flatConfigPoints(points);
          points = [];
          return newPolynom;
        }
      }
    }
    const newPoint = Point.onHandler(board, event);
    if (newPoint) {
      // mark first point
      if (!points.length) {
        newPoint.setAttribute(Colors.yellow[CONSTANT.TOOLS.POINT]);
      }
      points.push(newPoint);
    }
  };
}

function flatConfigPoints(pointsConfig) {
  return pointsConfig.reduce((acc, p, i) => {
    acc[i] = p;
    return acc;
  }, {});
}

function getConfig(polynom) {
  return {
    _type: 95,
    type: CONSTANT.TOOLS.POLYNOM,
    id: polynom.id,
    label: polynom.hasLabel ? polynom.label.plaintext : false,
    points: Object.keys(polynom.ancestors)
      .sort()
      .map(n => Point.getConfig(polynom.ancestors[n]))
  };
}

function parseConfig(pointsConfig) {
  return [
    "functiongraph",
    [pointsArgument => makeCallback(...pointsArgument), pointsConfig],
    {
      ...defaultConfig,
      fillColor: "transparent",
      label: getPointLabelParameters()
    }
  ];
}

function abort(cb) {
  cb([...points]);
  points = [];
}

export default {
  onHandler,
  getConfig,
  parseConfig,
  flatConfigPoints,
  abort
};
