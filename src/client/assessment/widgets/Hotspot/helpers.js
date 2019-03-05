import overlay from "overlay-pslg";

export const genarateEdgesAndAreaArrays = Area => {
  const newArea = Area.map(point => [point.x, point.y]);

  const newEdges = [];
  newArea.forEach((pair, i) => {
    if (i !== 0) {
      newEdges.push([i - 1, i]);
    }
  });
  newEdges.push([newArea.length - 1, 0]);

  return [newArea, newEdges];
};

// this function verifies that the current area is not intersect all already drawn areas
export const isFiguresIntersects = (newPoints, newAreas) => {
  const [newArea, newEdges] = newPoints;

  return newAreas.every(item => {
    const [area, edges] = item;
    return overlay(newArea, newEdges, area, edges, "and").blue.length === 0;
  });
};

// this function verifies that the current area is not intersect all already drawn areas
// and checks that the current area is not containing other areas and other way round
export const isPolygonsIntersects = (newPoints, newAreas) => {
  const [newArea, newEdges] = newPoints;

  return isFiguresIntersects(newPoints, newAreas)
    ? !!newAreas.every(item => {
        const [area, edges] = item;
        return overlay(area, edges, newArea, newEdges, "and").blue.length === 0;
      })
    : false;
};

export const isIntersects = (
  startPointOfCurrentLine,
  endPointOfCurrentLine,
  startPointOfTargetLine,
  endPointOfTargetLine
) => {
  const det =
    (endPointOfCurrentLine.x - startPointOfCurrentLine.x) * (endPointOfTargetLine.y - startPointOfTargetLine.y) -
    (endPointOfTargetLine.x - startPointOfTargetLine.x) * (endPointOfCurrentLine.y - startPointOfCurrentLine.y);
  if (det === 0) {
    return false;
  }
  const lambda =
    ((endPointOfTargetLine.y - startPointOfTargetLine.y) * (endPointOfTargetLine.x - startPointOfCurrentLine.x) +
      (startPointOfTargetLine.x - endPointOfTargetLine.x) * (endPointOfTargetLine.y - startPointOfCurrentLine.y)) /
    det;
  const gamma =
    ((startPointOfCurrentLine.y - endPointOfCurrentLine.y) * (endPointOfTargetLine.x - startPointOfCurrentLine.x) +
      (endPointOfCurrentLine.x - startPointOfCurrentLine.x) * (endPointOfTargetLine.y - startPointOfCurrentLine.y)) /
    det;
  return lambda > 0 && lambda < 1 && (gamma > 0 && gamma < 1);
};

// test on intersection our dashed line between other lines
export const testOnIntersection = (points, cursor) =>
  points
    .slice(0, -1)
    .some((point, i) => i !== 0 && isIntersects(points[points.length - 1], cursor, points[i - 1], point));

// test on intersection lines of current polygon between other lines in this polygon
export const testOnInnerIntersection = (points, activePoint) => {
  const indexOfActivePoint = points.indexOf(activePoint);
  let previousToActivePoint = points[points.length - 1];

  if (indexOfActivePoint !== 0) {
    previousToActivePoint = points[indexOfActivePoint - 1];
  }

  let nextToActivePoint = points[0];

  if (indexOfActivePoint !== points.length - 1) {
    nextToActivePoint = points[indexOfActivePoint + 1];
  }

  const easyIntersection = points.some(
    (point, i) =>
      i !== 0 && indexOfActivePoint !== i && isIntersects(previousToActivePoint, activePoint, points[i - 1], point)
  );

  const intersectionOfPreviosLine = isIntersects(
    previousToActivePoint,
    activePoint,
    points[points.length - 1],
    points[0]
  );

  const intersectionOfNextLine = isIntersects(activePoint, nextToActivePoint, points[points.length - 1], points[0]);

  const intersectionOfLastLine = points.some(
    (point, i) =>
      i !== points.length - 1 &&
      indexOfActivePoint !== i &&
      isIntersects(activePoint, nextToActivePoint, points[i + 1], point)
  );

  return easyIntersection || intersectionOfPreviosLine || intersectionOfNextLine || intersectionOfLastLine;
};

export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);

  const g = parseInt(hex.slice(3, 5), 16);

  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

export const getAlpha = color =>
  +color.match(/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/).slice(-1) * 100;
