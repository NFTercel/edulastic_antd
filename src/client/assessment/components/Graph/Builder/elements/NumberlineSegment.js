import { CONSTANT, Colors } from "../config";
import { orderPoints, findAvailableStackedSegmentPosition, getClosestTick, getSpecialTicks } from "../utils";
import { defaultPointParameters } from "../settings";

const previousPointsPositions = [];

function removeProhibitedTicks(segmentCoords, segments, ticks, currentPointX) {
  segments.forEach(segment => {
    if (segment.elType === "segment") {
      let points = [];
      Object.keys(segment.ancestors).forEach(key => {
        points.push(segment.ancestors[key].X());
      });
      points = orderPoints(points);

      if (segmentCoords[0] === currentPointX) {
        if (segmentCoords[1] < points[0]) {
          ticks = ticks.filter(t => t < points[0] && t !== segmentCoords[1]);
        } else if (segmentCoords[1] > points[1]) {
          ticks = ticks.filter(t => t > points[1] && t !== segmentCoords[1]);
        }
      } else if (segmentCoords[1] === currentPointX) {
        if (segmentCoords[0] < points[0]) {
          ticks = ticks.filter(t => t < points[0] && t !== segmentCoords[0]);
        } else if (segmentCoords[0] > points[1]) {
          ticks = ticks.filter(t => t > points[1] && t !== segmentCoords[0]);
        }
      }
    } else {
      const point = segment.coords.usrCoords[1];

      if (segmentCoords[0] === currentPointX) {
        if (segmentCoords[1] < point) {
          ticks = ticks.filter(t => t < point && t !== segmentCoords[1]);
        } else if (segmentCoords[1] > point) {
          ticks = ticks.filter(t => t > point && t !== segmentCoords[1]);
        }
      } else if (segmentCoords[1] === currentPointX) {
        if (segmentCoords[0] < point) {
          ticks = ticks.filter(t => t < point && t !== segmentCoords[0]);
        } else if (segmentCoords[0] > point) {
          ticks = ticks.filter(t => t > point && t !== segmentCoords[0]);
        }
      }
    }
  });
  return ticks;
}

const findAvailableSegmentDragPlace = (segmentCoords, segments, ticksDistance, direction) => {
  const newSegmentCoords = [...segmentCoords];

  do {
    if (direction) {
      newSegmentCoords[0] += ticksDistance;
      newSegmentCoords[1] += ticksDistance;
    } else {
      newSegmentCoords[0] -= ticksDistance;
      newSegmentCoords[1] -= ticksDistance;
    }

    let isPointInside = false;

    segments.forEach(segment => {
      if (segment.elType === "segment") {
        let points = [];

        Object.keys(segment.ancestors).forEach(key => {
          points.push(segment.ancestors[key].X());
        });

        points = orderPoints(points);

        if (
          (newSegmentCoords[0] >= points[0] && newSegmentCoords[0] <= points[1]) ||
          (newSegmentCoords[1] >= points[0] && newSegmentCoords[1] <= points[1])
        ) {
          isPointInside = true;
        }
      } else if (
        segment.coords.usrCoords[1] >= newSegmentCoords[0] &&
        segment.coords.usrCoords[1] <= newSegmentCoords[1]
      ) {
        isPointInside = true;
      }
    });

    if (!isPointInside) {
      return newSegmentCoords;
    }
  } while (segments);
};

// Pass board, handling segment, ticksDistance, numberlineAxis
// Check if there an element inside after segment dragging, then find closest available space and put segment there
const handleSegmentDrag = (board, segment, ticksDistance, axis, setAnswers) => {
  segment.on("up", () => {
    const segments = board.elements
      .filter(element => element.elType === "segment" || element.elType === "point")
      .filter(element => element.id !== segment.id);

    const segmentPoints = orderPoints([segment.point1.X(), segment.point2.X()]);

    let prevPosIndex;
    let newCoords;

    previousPointsPositions.forEach((element, index) => {
      if (element.id === segment.point1.id) {
        prevPosIndex = index;
      }
    });

    let ticks = getSpecialTicks(axis);
    if (segmentPoints[0] < previousPointsPositions[prevPosIndex].position) {
      ticks = removeProhibitedTicks(segmentPoints, segments, ticks, segmentPoints[0]);
    } else if (segmentPoints[0] > previousPointsPositions[prevPosIndex].position) {
      ticks = removeProhibitedTicks(segmentPoints, segments, ticks, segmentPoints[1]);
    }
    newCoords = [];
    newCoords[0] = getClosestTick(segmentPoints[0], ticks);
    newCoords[1] = getClosestTick(segmentPoints[1], ticks);

    if (newCoords) {
      segment.point1.setPosition(window.JXG.COORDS_BY_USER, [newCoords[0], 0]);
      segment.point2.setPosition(window.JXG.COORDS_BY_USER, [newCoords[1], 0]);
      setAnswers();
    }

    previousPointsPositions.forEach((element, index) => {
      if (element.id === segment.point1.id) {
        previousPointsPositions[index].position = segment.point1.X();
      }

      if (element.id === segment.point2.id) {
        previousPointsPositions[index].position = segment.point2.X();
      }
    });
  });
};

const handleStackedSegmentDrag = (segment, ticksDistance, axis, yPosition) => {
  segment.on("up", () => {
    const segmentPoints = orderPoints([segment.point1.X(), segment.point2.X()]);

    const xMin = axis.point1.X();
    const xMax = axis.point2.X();

    let newCoords;

    if (segmentPoints[0] <= xMin) {
      newCoords = findAvailableSegmentDragPlace(
        [Math.round(xMin - ticksDistance), Math.round(xMin)],
        [],
        ticksDistance,
        true
      );
    } else if (segmentPoints[1] >= xMax) {
      newCoords = findAvailableSegmentDragPlace(
        [Math.round(xMax), Math.round(xMax + ticksDistance)],
        [],
        ticksDistance,
        false
      );
    }

    if (newCoords) {
      segment.point1.setPosition(window.JXG.COORDS_BY_USER, [newCoords[0], yPosition]);
      segment.point2.setPosition(window.JXG.COORDS_BY_USER, [newCoords[1], yPosition]);
    }
  });
};

// Pass point, board, ticks distance of numberline axis, parent segment of point, numberline axis
// Function check if there an element inside of vector after dragging and if yes then find closest available space and put point there
const handleSegmentPointDrag = (point, board, ticksDistance, segment, axis, ticks) => {
  point.on("drag", () => {
    const currentPosition = point.X();

    const segments = board.elements
      .filter(element => element.elType === "segment" || element.elType === "point")
      .filter(element => element.id !== segment.id);
    const segmentCoords = orderPoints([segment.point1.X(), segment.point2.X()]);

    let prevPosIndex;

    previousPointsPositions.forEach((element, index) => {
      if (element.id === point.id) {
        prevPosIndex = index;
      }
    });

    ticks = getSpecialTicks(axis);
    ticks = removeProhibitedTicks(segmentCoords, segments, ticks, currentPosition);
    const newXCoord = getClosestTick(currentPosition, ticks);
    point.setPosition(window.JXG.COORDS_BY_USER, [newXCoord, 0]);
    previousPointsPositions[prevPosIndex].position = newXCoord;
  });
};

const handleStackedSegmentPointDrag = (point, axis, yPosition) => {
  point.on("drag", () => {
    const currentPosition = point.X();

    const xMin = axis.point1.X();
    const xMax = axis.point2.X();

    if (currentPosition > xMax) {
      point.setPosition(window.JXG.COORDS_BY_USER, [xMax, yPosition]);
    } else if (currentPosition < xMin) {
      point.setPosition(window.JXG.COORDS_BY_USER, [xMin, yPosition]);
    }
  });
};

// Pass segments, click coordinate, ticks distance of numberline axis
// Check if new segment is inside of existing segment
const checkForElementsOnSegment = (segments, coord, nextTick) => {
  let isSpaceAvailable = true;

  segments.forEach(segment => {
    if (segment.elType === "segment") {
      let points = [];

      Object.keys(segment.ancestors).forEach(key => {
        points.push(segment.ancestors[key].X());
      });

      points = orderPoints(points);

      if ((coord >= points[0] && coord <= points[1]) || (nextTick >= points[0] && nextTick <= points[1])) {
        isSpaceAvailable = false;
      }
    } else if (segment.coords.usrCoords[1] >= coord && segment.coords.usrCoords[1] <= nextTick) {
      isSpaceAvailable = false;
    }
  });

  return isSpaceAvailable;
};

// Pass numberlineAxis, click coordinate, ticksDistance
// Check if new segment is not falling outside of numberlineAxis
const checkForSegmentRenderPosition = (axis, coord, nextTick) => {
  const xMin = axis.point1.X();
  const xMax = axis.point2.X();

  if (coord < xMin || nextTick > xMax) {
    return false;
  }
  return true;
};

// Pass board, click coordinate, ticksDistance, point type (true = default point, false = unfilled point)
// Draw segment point with proper settings
const drawPoint = (board, coord, nextTick, point, fixed, colors, yPosition) => {
  const styles = point ? { ...Colors.default[CONSTANT.TOOLS.POINT] } : { ...Colors.special[CONSTANT.TOOLS.POINT] };

  return board.$board.create("point", [nextTick || coord, yPosition || 0], {
    ...(board.getParameters(CONSTANT.TOOLS.POINT) || defaultPointParameters()),
    ...styles,
    ...colors,
    fixed,
    snapToGrid: false
  });
};

// Pass board, first segment point, second segment point
// Draw new segment line
const drawLine = (board, firstPoint, secondPoint, colors) =>
  board.$board.create("segment", [firstPoint, secondPoint], {
    firstArrow: false,
    lastArrow: false,
    straightfirst: false,
    straightlast: false,
    snapToGrid: false,
    ...Colors.default[CONSTANT.TOOLS.LINE],
    ...colors
  });

const loadSegment = (board, coords, leftIncluded, rightIncluded, segmentType, stackResponses, setAnswers) => {
  const numberlineAxis = board.elements.filter(element => element.elType === "axis" || element.elType === "arrow");
  const ticksDistance = numberlineAxis[0].ticks[0].getAttribute("ticksDistance");

  let ticks = getSpecialTicks(numberlineAxis[0]);
  ticks = ticks.sort((a, b) => a - b);

  if (!stackResponses) {
    const firstPoint = drawPoint(board, coords[0], null, leftIncluded, false);
    const secondPoint = drawPoint(board, coords[1], null, rightIncluded, false);
    const segment = drawLine(board, firstPoint, secondPoint);
    segment.segmentType = segmentType;

    previousPointsPositions.push(
      { id: firstPoint.id, position: firstPoint.X() },
      { id: secondPoint.id, position: secondPoint.X() }
    );

    handleSegmentPointDrag(firstPoint, board, ticksDistance, segment, numberlineAxis[0], ticks);
    handleSegmentPointDrag(secondPoint, board, ticksDistance, segment, numberlineAxis[0], ticks);
    handleSegmentDrag(board, segment, ticksDistance, numberlineAxis[0], setAnswers);

    return segment;
  } else {
    const firstPoint = drawPoint(board, coords[0], null, leftIncluded, false, coords[2]);
    const secondPoint = drawPoint(board, coords[1], ticksDistance, rightIncluded, false, coords[2]);

    firstPoint.setAttribute({ snapSizeY: 0.05 });
    firstPoint.setPosition(window.JXG.COORDS_BY_USER, [firstPoint.X(), coords[2]]);
    board.$board.on("move", () => firstPoint.moveTo([firstPoint.X(), coords[2]]));

    secondPoint.setAttribute({ snapSizeY: 0.05 });
    secondPoint.setPosition(window.JXG.COORDS_BY_USER, [secondPoint.X(), coords[2]]);
    board.$board.on("move", () => secondPoint.moveTo([secondPoint.X(), coords[2]]));

    const segment = drawLine(board, firstPoint, secondPoint);
    segment.segmentType = segmentType;

    board.$board.on("drag", () => handleStackedSegmentDrag(segment, ticksDistance, numberlineAxis[0], coords[2]));

    handleStackedSegmentPointDrag(firstPoint, numberlineAxis[0], coords[2]);
    handleStackedSegmentPointDrag(secondPoint, numberlineAxis[0], coords[2]);

    return segment;
  }
};

// Pass board, coordinate (closest to ticksDistance click coordinate), left point type (true = filled point, false = unfilled point), right point type
// Check if space is available for new segment, then draw new segment
const drawSegment = (
  board,
  coord,
  leftIncluded,
  rightIncluded,
  segmentType,
  stackResponses,
  stackResponsesSpacing,
  setAnswers
) => {
  const numberlineAxis = board.elements.filter(element => element.elType === "axis" || element.elType === "arrow");
  const ticksDistance = numberlineAxis[0].ticks[0].getAttribute("ticksDistance");
  const segments = board.elements.filter(element => element.elType === "segment" || element.elType === "point");

  let ticks = getSpecialTicks(numberlineAxis[0]);

  if (typeof coord !== "number") {
    const x = board.getCoords(coord).usrCoords[1];
    coord = getClosestTick(x, ticks);
  }

  ticks = ticks.sort((a, b) => a - b);
  const nextTick = ticks[ticks.indexOf(coord) + 1];
  console.log("coord", coord);
  console.log("nextTick", nextTick);

  if (!stackResponses) {
    if (
      checkForElementsOnSegment(segments, coord, nextTick) &&
      checkForSegmentRenderPosition(numberlineAxis[0], coord, nextTick)
    ) {
      const firstPoint = drawPoint(board, coord, null, leftIncluded, false);
      const secondPoint = drawPoint(board, coord, nextTick, rightIncluded, false);
      const segment = drawLine(board, firstPoint, secondPoint);
      segment.segmentType = segmentType;

      previousPointsPositions.push(
        { id: firstPoint.id, position: firstPoint.X() },
        { id: secondPoint.id, position: secondPoint.X() }
      );

      handleSegmentPointDrag(firstPoint, board, ticksDistance, segment, numberlineAxis[0], ticks);
      handleSegmentPointDrag(secondPoint, board, ticksDistance, segment, numberlineAxis[0], ticks);
      handleSegmentDrag(board, segment, ticksDistance, numberlineAxis[0], setAnswers);

      return segment;
    }
  } else if (checkForSegmentRenderPosition(numberlineAxis[0], coord, ticksDistance)) {
    const calcedYPosition = findAvailableStackedSegmentPosition(board, segments, stackResponsesSpacing);

    const firstPoint = drawPoint(board, coord, null, leftIncluded, false, calcedYPosition);
    const secondPoint = drawPoint(board, coord, ticksDistance, rightIncluded, false, calcedYPosition);

    firstPoint.setAttribute({ snapSizeY: 0.05 });
    firstPoint.setPosition(window.JXG.COORDS_BY_USER, [firstPoint.X(), calcedYPosition]);
    board.$board.on("move", () => firstPoint.moveTo([firstPoint.X(), calcedYPosition]));

    secondPoint.setAttribute({ snapSizeY: 0.05 });
    secondPoint.setPosition(window.JXG.COORDS_BY_USER, [secondPoint.X(), calcedYPosition]);
    board.$board.on("move", () => secondPoint.moveTo([secondPoint.X(), calcedYPosition]));

    const segment = drawLine(board, firstPoint, secondPoint);
    segment.segmentType = segmentType;

    board.$board.on("drag", () => handleStackedSegmentDrag(segment, ticksDistance, numberlineAxis[0], calcedYPosition));

    handleStackedSegmentPointDrag(firstPoint, numberlineAxis[0], calcedYPosition);
    handleStackedSegmentPointDrag(secondPoint, numberlineAxis[0], calcedYPosition);

    return segment;
  }
};

const determineSegmentType = (type, board, coords, stackResponses, stackResponsesSpacing, setAnswers) => {
  switch (type) {
    case CONSTANT.TOOLS.BOTH_INCLUDED_SEGMENT:
      return drawSegment(
        board,
        coords,
        true,
        true,
        CONSTANT.TOOLS.BOTH_INCLUDED_SEGMENT,
        stackResponses,
        stackResponsesSpacing,
        setAnswers
      );
    case CONSTANT.TOOLS.BOTH_NOT_INCLUDED_SEGMENT:
      return drawSegment(
        board,
        coords,
        false,
        false,
        CONSTANT.TOOLS.BOTH_NOT_INCLUDED_SEGMENT,
        stackResponses,
        stackResponsesSpacing,
        setAnswers
      );
    case CONSTANT.TOOLS.ONLY_RIGHT_INCLUDED_SEGMENT:
      return drawSegment(
        board,
        coords,
        false,
        true,
        CONSTANT.TOOLS.ONLY_RIGHT_INCLUDED_SEGMENT,
        stackResponses,
        stackResponsesSpacing,
        setAnswers
      );
    case CONSTANT.TOOLS.ONLY_LEFT_INCLUDED_SEGMENT:
      return drawSegment(
        board,
        coords,
        true,
        false,
        CONSTANT.TOOLS.ONLY_LEFT_INCLUDED_SEGMENT,
        stackResponses,
        stackResponsesSpacing,
        setAnswers
      );
    default:
      throw new Error("Unknown tool:");
  }
};

const determineAnswerType = (board, config) => {
  switch (config.type) {
    case CONSTANT.TOOLS.BOTH_INCLUDED_SEGMENT:
      return renderAnswer(board, config, true, true);
    case CONSTANT.TOOLS.BOTH_NOT_INCLUDED_SEGMENT:
      return renderAnswer(board, config, false, false);
    case CONSTANT.TOOLS.ONLY_RIGHT_INCLUDED_SEGMENT:
      return renderAnswer(board, config, false, true);
    case CONSTANT.TOOLS.ONLY_LEFT_INCLUDED_SEGMENT:
      return renderAnswer(board, config, true, false);
    default:
      throw new Error("Unknown tool:");
  }
};

const onHandler = (type, stackResponses, stackResponsesSpacing, setAnswers) => (board, coords) =>
  determineSegmentType(type, board, coords, stackResponses, stackResponsesSpacing, setAnswers);

const renderAnswer = (board, config, leftIncluded, rightIncluded) => {
  const firstPoint = drawPoint(board, config.point1, null, leftIncluded, true, config.leftPointColor, config.y);
  const secondPoint = drawPoint(board, config.point2, null, rightIncluded, true, config.rightPointColor, config.y);
  const segment = drawLine(board, firstPoint, secondPoint, config.lineColor);

  firstPoint.setAttribute({ snapSizeY: 0.05 });
  firstPoint.setPosition(window.JXG.COORDS_BY_USER, [firstPoint.X(), config.y]);

  secondPoint.setAttribute({ snapSizeY: 0.05 });
  secondPoint.setPosition(window.JXG.COORDS_BY_USER, [secondPoint.X(), config.y]);

  segment.answer = firstPoint.answer = secondPoint.answer = true;

  return segment;
};

const getConfig = segment => ({
  id: segment.id,
  type: segment.segmentType,
  point1: segment.point1.X(),
  point2: segment.point2.X(),
  y: segment.point1.Y()
});

export default {
  onHandler,
  getConfig,
  loadSegment,
  determineAnswerType
};
