import { Point } from ".";
import segmentConfig from "./Segment";
import { CONSTANT, Colors } from "../config";

export const getPointLabelParameters = () => ({
  offset: [0, 10],
  anchorX: "middle",
  anchorY: "middle",
  cssClass: "myLabel",
  highlightCssClass: "myLabel"
});

export const defaultConfig = {
  hasInnerPoints: true
};

function isStart(point, coords) {
  const x = Math.round(coords[1]);
  const y = Math.round(coords[2]);
  return point.coords.usrCoords[1] === x && point.coords.usrCoords[2] === y;
}

let points = [];
let lines = [];

function onHandler() {
  return (board, event) => {
    if (points.length >= 3) {
      // wait 3 points
      // handle closing polygon
      const coords = board.getCoords(event);
      if (isStart(points[0], coords.usrCoords)) {
        lines.map(board.$board.removeObject.bind(board.$board));
        points[0].setAttribute(Colors.default[CONSTANT.TOOLS.POINT]);
        const newPolygon = board.$board.create("polygon", points, {
          ...defaultConfig,
          ...Colors.default[CONSTANT.TOOLS.POLYGON],
          label: getPointLabelParameters()
        });
        points = [];
        lines = [];
        return newPolygon;
      }
    }
    const newPoint = Point.onHandler(board, event);
    if (newPoint) {
      // mark first point
      if (!points.length) {
        newPoint.setAttribute(Colors.yellow[CONSTANT.TOOLS.POINT]);
      }
      if (points.length > 0) {
        lines.push(
          board.$board.create("line", [points[points.length - 1], newPoint], {
            ...segmentConfig,
            ...Colors.default[CONSTANT.TOOLS.LINE]
          })
        );
      }
      points.push(newPoint);
    }
  };
}

function getConfig(polygon) {
  return {
    _type: polygon.type,
    type: CONSTANT.TOOLS.POLYGON,
    id: polygon.id,
    label: polygon.hasLabel ? polygon.label.plaintext : false,
    points: Object.keys(polygon.ancestors)
      .sort()
      .map(n => Point.getConfig(polygon.ancestors[n]))
  };
}

function flatConfigPoints(pointsConfig) {
  return pointsConfig.reduce((acc, p, i) => {
    acc[i] = p.id;
    return acc;
  }, {});
}

function parseConfig() {
  return {
    highlightFillColor: "#ccc",
    highlightStrokeColor: "#ccc",
    highlightFillOpacity: 0.3,
    fillColor: "#ccc",
    ...defaultConfig,
    label: getPointLabelParameters()
  };
}

function abort(cb) {
  cb([...points]);
  points = [];
  lines = [];
}

export default {
  onHandler,
  getConfig,
  parseConfig,
  flatConfigPoints,
  abort
};
