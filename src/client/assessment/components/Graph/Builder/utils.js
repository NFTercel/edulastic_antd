import { CONSTANT } from "./config";
import Point from "./elements/Point";
import { defaultConfig as lineConfig } from "./elements/Line";
import rayConfig from "./elements/Ray";
import segmentConfig from "./elements/Segment";
import vectorConfig from "./elements/Vector";
import Polygon from "./elements/Polygon";
// import { JXG } from './index';

export const findAvailableStackedSegmentPosition = (board, segments, stackResponsesSpacing) => {
  const [x, y] = calcMeasure(board.$board.canvasWidth, board.$board.canvasHeight, board);
  const [xMeasure, yMeasure] = calcMeasure(0, stackResponsesSpacing, board);
  const lineY = 0.5 - (y / 100) * 75;
  let calcedYPosition = lineY + yMeasure;

  for (let i = 0; i <= segments.length; i++) {
    const yPosition = Math.round((lineY + yMeasure * (i + 1)) * 10) / 10;
    let isPositionAvailable = true;

    segments.forEach(segment => {
      if (segment.elType === "point") {
        if (segment.Y() === yPosition) {
          isPositionAvailable = false;
        }
      } else if (segment.point2.coords.usrCoords[2] === yPosition) {
        isPositionAvailable = false;
      }
    });

    if (isPositionAvailable) {
      return (calcedYPosition = yPosition);
    }
  }

  return calcedYPosition;
};

export const findSegmentPosition = (board, coords) => {
  const position = board.getCoords(coords);
  return Math.round(position.usrCoords[1]);
};

// Pass points of segment
// Function placing smallest element to the first place
export const orderPoints = points => {
  if (points[0] === points[1]) {
    return points;
  }
  if (points[0] < points[1]) {
    return points;
  }
  return [points[1], points[0]];
};

export const lineLabelCoord = (firstPoint, secondPoint) => {
  if (firstPoint === secondPoint) {
    return firstPoint;
  }
  if (firstPoint < secondPoint) {
    const segmentLength = -firstPoint + secondPoint;
    return secondPoint - segmentLength / 2;
  }
  const segmentLength = -secondPoint + firstPoint;
  return firstPoint - segmentLength / 2;
};

// Calculate position between two points for line
export const calcLineLabelPosition = line => {
  const finalXCoord = lineLabelCoord(line.point1.coords.usrCoords[1], line.point2.coords.usrCoords[1]);
  const finalYCoord = lineLabelCoord(line.point1.coords.usrCoords[2], line.point2.coords.usrCoords[2]);
  return [finalXCoord, finalYCoord];
};

const fractionsNumber = number =>
  number.toString().includes(".")
    ? number
        .toString()
        .split(".")
        .pop().length
    : 0;

// Calculate point rounded to ticksDistance value
export const calcRoundedToTicksDistance = (x, ticksDistance) => {
  if (fractionsNumber(ticksDistance) === 0) {
    if (x % ticksDistance >= ticksDistance / 2) {
      // closer to the biggest value
      let distanceDiff = x;
      do {
        distanceDiff = Math.ceil(distanceDiff + 0.0001);
      } while (distanceDiff % ticksDistance !== 0);

      return x + (distanceDiff - x);
    }
    // closer to the smallest value
    return Math.round(x - (x % ticksDistance));
  }
  let ticksRounded = ticksDistance;
  let iterationsCount = 0;
  let xRounded = x;

  do {
    xRounded *= 10;
    ticksRounded *= 10;
    iterationsCount += 1;
  } while (fractionsNumber(ticksRounded) !== 0);

  xRounded = Math.floor(xRounded);

  let roundedCoord = calcRoundedToTicksDistance(xRounded, ticksRounded);

  do {
    roundedCoord /= 10;
    iterationsCount -= 1;
  } while (iterationsCount !== 0);

  return roundedCoord;
};

// Calculate unitX
export const calcUnitX = (xMin, xMax, layoutWidth) => {
  const unitLength = -xMin + xMax;
  return layoutWidth / unitLength;
};

// Return different element from new array
export const findElementsDiff = (mainArray, secondaryArray) => {
  let diffElement;

  mainArray.forEach((mainElement, index) => {
    let flag = false;

    secondaryArray.forEach(secondaryElement => {
      if (mainElement.id === secondaryElement.id) {
        flag = true;
      }
    });

    if (!flag) {
      diffElement = mainArray[index];
    }
  });

  return diffElement;
};

// Calculate amount of units in chosen amount of pixels
export const calcMeasure = (x, y, board) => {
  if (board.$board === undefined) {
    return [x / board.unitX, y / board.unitY];
  }
  return [x / board.$board.unitX, y / board.$board.unitY];
};

// Calculate first available space for render in marks container
export const checkMarksRenderSpace = (board, settings, containerSettings) => {
  const [xContainerMeasure, yContainerMeasure] = calcMeasure(
    board.$board.canvasWidth,
    board.$board.canvasHeight,
    board
  );
  const [xPadding, yPadding] = calcMeasure(
    settings.separationDistanceX <= 0 ? 1 : settings.separationDistanceX,
    settings.separationDistanceY <= 0 ? 1 : settings.separationDistanceY,
    board
  ); // Padding from settings
  const [xMeasure, yMeasure] = calcMeasure(52.5, 65, board); // half of element's width and full height in units
  const [markXMeasure, markYMeasure] = calcMeasure(51.5, 45, board);

  const filteredElements = board.elements.filter(element => element.elType === "group");
  const containerY = containerSettings.yMax - (yContainerMeasure / 100) * containerSettings.position; // End of the mark's container

  const xRenderPos = board.$board.plainBB[0] + xMeasure + xPadding; // X start position for marks' point
  const yRenderPos = containerY - yMeasure - yPadding; // Y start position for mark's point
  const elementSpace = (xMeasure + xPadding) * 2; // Full width of one mark

  if (filteredElements.length === 0) {
    // If it's first element
    return [xRenderPos, yRenderPos];
  }
  for (let i = 0; i < filteredElements.length; i++) {
    //  Compare each POSITION with each element
    const xStart = board.$board.plainBB[0] + elementSpace * i;
    const xEnd = board.$board.plainBB[0] + elementSpace * (i + 1);
    let isPositionAvailable = true;

    for (let j = 0; j < filteredElements.length; j++) {
      const [groupZPos, groupXPos, groupYPos] = filteredElements[j].translationPoints[0].coords.usrCoords;
      const markLeftSide = groupXPos - xMeasure;
      const markRightSide = groupXPos + xMeasure;

      if (
        groupYPos < containerY - markYMeasure * 1.35 &&
        ((markRightSide > xStart && markRightSide < xEnd) || (markLeftSide < xEnd && markLeftSide > xStart))
      ) {
        // If some element is on this place
        isPositionAvailable = false;
      }
    }

    if (isPositionAvailable) {
      return [xRenderPos + elementSpace * i, yRenderPos];
    }
  }

  // If all elements at their start place
  return [xRenderPos + elementSpace * filteredElements.length, yRenderPos];
};

function compareKeys(config, props) {
  return Object.keys(config).every(k => !!props[k] === !!config[k]);
}

function numberWithCommas(x) {
  x = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) {
    x = x.replace(pattern, "$1,$2");
  }
  return x;
}

function getPointsFromFlatConfig(type, pointIds, config) {
  switch (type) {
    case CONSTANT.TOOLS.POLYGON:
    case CONSTANT.TOOLS.ELLIPSE:
    case CONSTANT.TOOLS.HYPERBOLA:
      return Object.keys(pointIds)
        .sort()
        .map(k => config.find(element => element.id === pointIds[k]));
    default:
      return [
        config.find(element => element.id === pointIds.startPoint),
        config.find(element => element.id === pointIds.endPoint)
      ];
  }
}

export const handleSnap = (line, points) => {
  line.on("up", () => {
    const setCoords = window.JXG.COORDS_BY_USER;
    points.forEach(point => point.setPositionDirectly(setCoords, [Math.round(point.X()), Math.round(point.Y())]));
  });
};

export function getLineTypeByProp(props) {
  if (compareKeys(lineConfig, props)) {
    return CONSTANT.TOOLS.LINE;
  }
  if (compareKeys(rayConfig, props)) {
    return CONSTANT.TOOLS.RAY;
  }
  if (compareKeys(segmentConfig, props)) {
    return CONSTANT.TOOLS.SEGMENT;
  }
  if (compareKeys(vectorConfig, props)) {
    return CONSTANT.TOOLS.VECTOR;
  }
  throw new Error("Unknown line", props);
}

export function getPropsByLineType(type) {
  switch (type) {
    case "line":
      return lineConfig;
    case "ray":
      return rayConfig;
    case "segment":
      return segmentConfig;
    case "vector":
      return vectorConfig;
    default:
      throw new Error("Unknown line type:", type);
  }
}

export function tickLabel(axe, withComma = true, distance = 0) {
  return coords => {
    const label = axe === "x" ? coords.usrCoords[1] : coords.usrCoords[2];
    if (axe === "x" && label === 0) {
      // offset fix for zero label
      return "0&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;";
    }
    if (axe === "y" && label === 0) {
      return "";
    }
    return withComma ? numberWithCommas(label.toFixed(distance)) : label;
  };
}

export function updatePointParameters(elements, attr, isSwitchToGrid) {
  if (!elements) {
    return;
  }

  Object.keys(elements).forEach(key => {
    const el = elements[key];
    if (el.type === window.JXG.OBJECT_TYPE_POINT) {
      el.setAttribute(attr);
      if (isSwitchToGrid) {
        el.setPositionDirectly(window.JXG.COORDS_BY_USER, Point.roundCoords(el.coords.usrCoords));
      }
    } else {
      updatePointParameters(Object.values(el.ancestors), attr, isSwitchToGrid);
    }
  });
}

export function updateAxe(line, parameters, axe) {
  if ("ticksDistance" in parameters) {
    line.ticks[0].setAttribute({ ticksDistance: parameters.ticksDistance });
  }
  if ("showTicks" in parameters) {
    line.ticks[0].setAttribute({ majorHeight: parameters.showTicks ? 25 : 0 });
  }
  if ("drawLabels" in parameters) {
    line.ticks[0].setAttribute({ drawLabels: parameters.drawLabels });
  }
  if ("name" in parameters && line.name !== parameters.name) {
    if (!parameters.name) {
      line.setAttribute({ withLabel: false, name: "" });
    } else {
      line.setAttribute({ withLabel: true, name: parameters.name });
    }
  }
  if ("minArrow" in parameters || "maxArrow" in parameters) {
    line.setArrow(
      parameters.minArrow === true ? { size: 8 } : false,
      parameters.maxArrow === true ? { size: 8 } : false
    );
  }
  if ("commaInLabel" in parameters) {
    line.ticks[0].generateLabelText = tickLabel(axe, parameters.commaInLabel);
  }
  if ("drawZero" in parameters) {
    line.ticks[0].setAttribute({ drawZero: parameters.drawZero });
  }
  if ("visible" in parameters) {
    line.setAttribute({ visible: parameters.visible });
  }
}

// Update numberline axis settings
export const updateNumberline = (numberline, settings) => {
  if ("showTicks" in settings) {
    numberline[0].ticks[0].setAttribute({ visible: settings.showTicks });
  }
  if ("ticksDistance" in settings) {
    numberline[0].ticks[0].setAttribute({
      ticksDistance: settings.ticksDistance
    });
  }
  if ("fontSize" in settings) {
    numberline[0].ticks[0].labels.forEach(label => label.setAttribute({ fontSize: settings.fontSize }));
  }
};

export function updateGrid(grids, parameters) {
  if (grids[0]) {
    grids[0].setAttribute(parameters);
  }
}

/**
 *
 * @param {object} boardParameters
 * @param {object} image
 * @requires Array [[left corner] ,[W,H]]
 */
export function getImageCoordsByPercent(boardParameters, bgImageParameters) {
  const { graphParameters } = boardParameters;
  const { size, coords } = bgImageParameters;
  const xSize = Math.abs(graphParameters.xMin) + Math.abs(graphParameters.xMax);
  const ySize = Math.abs(graphParameters.yMin) + Math.abs(graphParameters.yMax);
  const imageSize = [Math.round((xSize / 100) * size[0]), Math.round((ySize / 100) * size[1])];
  const leftCorner = [coords[0] - imageSize[0] / 2, coords[1] - imageSize[1] / 2];
  return [leftCorner, imageSize];
}

export function flatConfig(config, accArg = {}, isSub = false) {
  return config.reduce((acc, element) => {
    const { id, type, points } = element;
    if (type === CONSTANT.TOOLS.POINT || type === CONSTANT.TOOLS.MARK) {
      if (!acc[id]) {
        acc[id] = element;
      }
      if (isSub) {
        acc[id].subElement = true;
      }
      return acc;
    }
    acc[id] = {
      type,
      _type: element._type,
      id: element.id,
      label: element.label
    };
    if (type !== CONSTANT.TOOLS.POLYGON && type !== CONSTANT.TOOLS.ELLIPSE && type !== CONSTANT.TOOLS.HYPERBOLA) {
      acc[id].subElementsIds = {
        startPoint: points[0].id,
        endPoint: points[1].id
      };
    } else {
      acc[id].subElementsIds = Polygon.flatConfigPoints(points);
    }
    return flatConfig(points, acc, true);
  }, accArg);
}

export function flat2nestedConfig(config) {
  return Object.values(
    config.reduce((acc, element) => {
      const { id, type, subElement = false } = element;

      if (!acc[id] && !subElement) {
        acc[id] = {
          id,
          type,
          _type: element._type,
          colors: element.colors || null,
          label: element.label
        };
        if (type === CONSTANT.TOOLS.POINT || type === CONSTANT.TOOLS.MARK) {
          acc[id].x = element.x;
          acc[id].y = element.y;
        } else {
          acc[id].points = getPointsFromFlatConfig(type, element.subElementsIds, config);
        }
      }
      return acc;
    }, {})
  );
}

export default getLineTypeByProp;

/**
 * Returns closest number from array "ticks" to given number "pointX"
 * @param {number} pointX - any number
 * @param {array} ticks - array of numbers
 * */
export function getClosestTick(pointX, ticks) {
  function dist(x, t) {
    return Math.abs(x - t);
  }
  let minDist = dist(pointX, ticks[0]);
  let closestTick = ticks[0];
  for (let i = 1; i < ticks.length; i++) {
    const tmpDist = dist(pointX, ticks[i]);
    if (tmpDist < minDist) {
      minDist = tmpDist;
      closestTick = ticks[i];
    }
  }
  return closestTick;
}

/**
 * Returns array of ticks
 * @param {object} axis - jsxgraph axis object with special ticks
 * @return {array} array of number(s)
 * */
export function getSpecialTicks(axis) {
  const ticks = axis.ticks.filter(t => t.fixedTicks !== null);
  let fixedTicks = [];
  ticks.forEach(t => {
    fixedTicks = fixedTicks.concat(t.fixedTicks);
  });
  return fixedTicks;
}
