import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { cloneDeep, isEqual } from "lodash";
import { withTheme } from "styled-components";

import {
  genarateEdgesAndAreaArrays,
  isFiguresIntersects,
  testOnIntersection,
  testOnInnerIntersection,
  isPolygonsIntersects
} from "./helpers";

import { Svg } from "./styled/Svg";
import { Circle } from "./styled/Circle";
import { Polyline } from "./styled/Polyline";
import { Line } from "./styled/Line";
import { Polygon } from "./styled/Polygon";
import { G } from "./styled/G";
import { Rect } from "./styled/Rect";
import { Text } from "./styled/Text";

const circleRadius = 6;

const SvgContainer = React.memo(({ width, height, imageSrc, history, changeHistory, theme }) => {
  const [points, setPoints] = useState([]);
  const [areas, setAreas] = useState([]);
  const [cursor, setCursor] = useState({});
  const [mouseOn, setMouseOn] = useState(false);
  const [intersectionState, setIntersectionState] = useState(false);
  const [polygonIntersect, setPolygonIntersect] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [polygonPoints, setPolygonPoints] = useState(null);
  const [activeCircle, setActiveCircle] = useState(null);
  const [draggingPolygon, setDraggingPolygon] = useState(null);
  const [dragPolygon, setDragPolygon] = useState(null);

  useEffect(() => {
    setPoints(history ? history.points : []);
    setAreas(history ? history.areas : []);
    if (history && history.areas && history.areas.length === 0) {
      setSelectedPolygon(null);
      setPolygonPoints(null);
    } else if (history && history.areas && history.areas[selectedPolygon]) {
      setPolygonPoints(history.areas[selectedPolygon]);
    } else {
      setSelectedPolygon(null);
      setPolygonPoints(null);
    }
  }, [history]);

  const image = useRef(null);

  const handleCircleClick = () => {
    const newAreas = cloneDeep(areas);
    newAreas.push(points);

    const areasArrays = areas.map(item => genarateEdgesAndAreaArrays(item));

    const newAreaArrays = genarateEdgesAndAreaArrays(points);

    if (isFiguresIntersects(newAreaArrays, areasArrays)) {
      changeHistory(newAreas, []);
    } else {
      changeHistory(areas, []);
    }
  };

  const handleCursor = e => {
    const position = image.current.getBoundingClientRect();

    const point = {
      x: e.clientX - position.left,
      y: e.clientY - position.top
    };

    if (activeCircle !== null) {
      const newPolygonPoints = cloneDeep(polygonPoints);

      newPolygonPoints[activeCircle] = point;

      setPolygonPoints(newPolygonPoints);

      const areasArrays = areas
        .filter((item, i) => i !== selectedPolygon)
        .map(item => genarateEdgesAndAreaArrays(item));

      const newAreaArrays = genarateEdgesAndAreaArrays(newPolygonPoints);

      if (!isFiguresIntersects(newAreaArrays, areasArrays)) {
        if (!polygonIntersect) {
          setPolygonIntersect(true);
        }
      } else if (polygonIntersect) {
        setPolygonIntersect(false);
      }

      if (!testOnInnerIntersection(newPolygonPoints, point)) {
        if (intersectionState) {
          setIntersectionState(false);
        }
      } else if (!intersectionState) {
        setIntersectionState(true);
      }
    } else if (!testOnIntersection(points, cursor)) {
      if (intersectionState) {
        setIntersectionState(false);
      }
    } else if (!intersectionState) {
      setIntersectionState(true);
    }

    if (draggingPolygon !== null) {
      const diff = { x: point.x - cursor.x, y: point.y - cursor.y };
      const newPoints = cloneDeep(dragPolygon);

      newPoints.forEach(oldPoint => {
        oldPoint.x += diff.x;
        oldPoint.y += diff.y;
      });

      const areasArrays = areas
        .filter((item, i) => i !== draggingPolygon)
        .map(item => genarateEdgesAndAreaArrays(item));

      const newAreaArrays = genarateEdgesAndAreaArrays(newPoints);

      if (!isPolygonsIntersects(newAreaArrays, areasArrays)) {
        if (!polygonIntersect) {
          setPolygonIntersect(true);
        }
      } else if (polygonIntersect) {
        setPolygonIntersect(false);
      }
      if (
        !newPoints.every(
          newPoint =>
            newPoint.x > circleRadius &&
            newPoint.y > circleRadius &&
            newPoint.y < height - circleRadius &&
            newPoint.x < width - circleRadius
        )
      ) {
        setIntersectionState(true);
      }

      setDragPolygon(newPoints);
    }

    if (mouseOn) {
      if (!isEqual(point, cursor)) setCursor(point);
    }
  };

  const handleClick = e => {
    if (selectedPolygon === null) {
      const newPoints = cloneDeep(points);

      const position = image.current.getBoundingClientRect();

      const point = {
        x: e.clientX - position.left,
        y: e.clientY - position.top
      };

      if (e.target === image.current) {
        if (newPoints[0]) {
          if (
            newPoints.every(
              p => Math.abs(point.x - p.x) > circleRadius * 2 || Math.abs(point.y - p.y) > circleRadius * 2
            )
          ) {
            if (!intersectionState) newPoints.push(point);
          }
        } else {
          newPoints.push(point);
        }
        if (!isEqual(newPoints, points)) {
          changeHistory(areas || [], newPoints);
        }
      }
    } else {
      setSelectedPolygon(null);
      setPolygonPoints(null);
    }
  };

  const handleLineClick = e => {
    e.target = image.current;
    handleClick(e);
  };

  const handleOnEnterPolygon = () => {
    if (!polygonIntersect && points[0]) {
      setPolygonIntersect(true);
    }
  };

  const handleOnLeavePolygon = () => {
    if (polygonIntersect && points[0]) {
      setPolygonIntersect(false);
    }
  };

  const handleCircleMouseDown = i => () => {
    setActiveCircle(i);
  };

  const handleCircleMouseUp = () => {
    if (activeCircle !== null) {
      const newAreas = cloneDeep(areas);

      newAreas[selectedPolygon] = polygonPoints;
      if (!intersectionState && !polygonIntersect) {
        changeHistory(newAreas, points);
      } else {
        setPolygonPoints(areas[selectedPolygon]);
      }

      setActiveCircle(null);
      setPolygonIntersect(false);
      setIntersectionState(false);
    }
  };

  const getPolygonToDrag = i => () => {
    setDraggingPolygon(i);
    setDragPolygon(areas[i]);
    setSelectedPolygon(null);
    setPolygonPoints(null);
  };

  const removePolygonToDrag = () => {
    const newAreas = cloneDeep(areas);

    newAreas[draggingPolygon] = dragPolygon;

    if (!intersectionState && !polygonIntersect) {
      changeHistory(newAreas, points);
      setAreas(newAreas);
      setSelectedPolygon(draggingPolygon);
      setPolygonPoints(newAreas[draggingPolygon]);
    } else {
      setSelectedPolygon(draggingPolygon);
      setPolygonPoints(areas[draggingPolygon]);
      setDragPolygon(null);
    }

    setDraggingPolygon(null);
    setDragPolygon(null);
    setPolygonIntersect(false);
    setIntersectionState(false);
  };

  const calculatePolygonPoints = (area, i) =>
    selectedPolygon === i && Array.isArray(polygonPoints)
      ? polygonPoints.map(point => `${point.x},${point.y}`).join(" ")
      : area.map(point => `${point.x},${point.y}`).join(" ");

  const isIntersectedAndActivePolygon = i =>
    (intersectionState || polygonIntersect) && (selectedPolygon === i || draggingPolygon === i);

  const getPolygonFill = i =>
    isIntersectedAndActivePolygon(i) ? theme.widgets.hotspot.intersectFillColor : theme.widgets.hotspot.svgMapFillColor;

  const getPolygonStroke = i =>
    isIntersectedAndActivePolygon(i)
      ? theme.widgets.hotspot.intersectStrokeColor
      : theme.widgets.hotspot.svgMapStrokeColor;

  return (
    <div
      onMouseLeave={() => setMouseOn(false)}
      onMouseEnter={() => setMouseOn(true)}
      onMouseMove={handleCursor}
      id="svg-control-block"
    >
      <Svg
        width={width}
        intersect={intersectionState || polygonIntersect}
        height={height}
        onMouseUp={handleCircleMouseUp}
        onClick={handleClick}
      >
        <image ref={image} href={imageSrc} width={width} height={height} preserveAspectRatio="none" x={0} y={0} />

        {points.map((point, i) => (
          <Circle
            key={i}
            onClick={i === 0 && points.length > 2 ? handleCircleClick : undefined}
            cx={point.x}
            cy={point.y}
            r={circleRadius}
          />
        ))}

        <Polyline points={points.map(point => `${point.x},${point.y}`).join(" ")} />

        {points[0] && mouseOn && (
          <Line
            onClick={handleLineClick}
            intersect={intersectionState || polygonIntersect}
            x1={points[points.length - 1].x}
            y1={points[points.length - 1].y}
            x2={cursor.x}
            y2={cursor.y}
          />
        )}

        {Array.isArray(areas) &&
          areas.length > 0 &&
          areas.map(
            (area, i) =>
              draggingPolygon !== i && (
                <Polygon
                  key={i}
                  intersect={!!points[0]}
                  onMouseDown={points[0] ? undefined : getPolygonToDrag(i)}
                  onMouseLeave={handleOnLeavePolygon}
                  onMouseEnter={handleOnEnterPolygon}
                  fill={getPolygonFill(i)}
                  stroke={getPolygonStroke(i)}
                  active={selectedPolygon === i}
                  points={calculatePolygonPoints(area, i)}
                />
              )
          )}

        {Array.isArray(dragPolygon) && (
          <Polygon
            intersect={intersectionState || polygonIntersect}
            onMouseUp={points[0] ? undefined : removePolygonToDrag}
            fill={getPolygonFill(draggingPolygon)}
            stroke={getPolygonStroke(draggingPolygon)}
            points={dragPolygon.map(point => `${point.x},${point.y}`).join(" ")}
          />
        )}

        {draggingPolygon === null &&
          Array.isArray(areas) &&
          areas.length > 0 &&
          areas.map(
            (area, i) =>
              (selectedPolygon !== i || activeCircle === null) && (
                <G key={i} transform={`translate(${area[0].x},${area[0].y})`}>
                  <Rect x={0} y={0} rx={4} ry={4} width={40} height={40} />
                  <Text x={8} y={12} dx={7} dy={11}>
                    {i + 1}
                  </Text>
                </G>
              )
          )}

        {Array.isArray(polygonPoints) &&
          polygonPoints.map((point, i) => (
            <Circle
              key={i}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              cx={point.x}
              intersect={intersectionState || polygonIntersect}
              cursor="pointer"
              onMouseDown={handleCircleMouseDown(i)}
              onMouseUp={handleCircleMouseUp}
              cy={point.y}
              r={circleRadius}
            />
          ))}
      </Svg>
    </div>
  );
});

SvgContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  changeHistory: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTheme(SvgContainer);
