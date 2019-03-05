import React, { useRef, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";

import { drawTools } from "@edulastic/constants";
import styled from "styled-components";
import { Input } from "antd";

const SvgDraw = ({ lineColor, lineWidth, activeMode, scratchPadMode, history, saveHistory, fillColor, deleteMode }) => {
  const svg = useRef(null);

  const [points, setPoints] = useState([]);
  const [pathes, setPathes] = useState([]);
  const [dragStart, setDragStart] = useState(false);
  const [active, setActive] = useState(null);
  const [figures, setFigures] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [mouseClicked, setMouseClicked] = useState(false);
  const [inputIsVisible, setInputIsVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState("");
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    if (history && history.points && history.pathes && history.figures && history.texts) {
      setPoints(history.points);
      setPathes(history.pathes);
      setFigures(history.figures);
      setTexts(history.texts);

      if (active && !history.figures[active]) {
        setActive(null);
      }
    }
  }, [history]);

  useEffect(() => {
    setActive(null);
  }, [activeMode]);

  const handleMove = e => {
    if (mouseClicked) {
      const newPoints = cloneDeep(points);
      const bounded = svg.current.getBoundingClientRect();

      newPoints.push({
        lineWidth,
        color: lineColor,
        x: e.clientX - bounded.left,
        y: e.clientY - bounded.top
      });
      setPoints(newPoints);
    }
  };

  const handleMouseDown = e => {
    setMouseClicked(true);
    const newPoints = cloneDeep(points);
    const bounded = svg.current.getBoundingClientRect();

    newPoints.push({
      lineWidth,
      color: lineColor,
      x: e.clientX - bounded.left,
      y: e.clientY - bounded.top
    });
    setPoints(newPoints);
  };

  const handleSavePath = () => {
    setMouseClicked(false);
    setPathes([...pathes, cloneDeep(points)]);
    setPoints([]);
    saveHistory({
      pathes: [...pathes, cloneDeep(points)],
      points: [],
      texts,
      figures
    });
  };

  const handlePoint = (modifier = "") => e => {
    const newPoints = cloneDeep(points);
    const bounded = svg.current.getBoundingClientRect();
    if (newPoints.length === 0) {
      newPoints.push({
        lineWidth,
        modifier,
        color: lineColor,
        x: e.clientX - bounded.left,
        y: e.clientY - bounded.top
      });
    }
    newPoints.push({
      lineWidth,
      modifier,
      color: lineColor,
      x: e.clientX - bounded.left,
      y: e.clientY - bounded.top
    });

    setPoints(newPoints);
    saveHistory({ pathes, points: newPoints, texts, figures });
  };

  const handleLineSecondPoint = e => {
    if (mouseClicked) {
      const newPoints = cloneDeep(points);
      const bounded = svg.current.getBoundingClientRect();

      newPoints[1] = {
        lineWidth,
        color: lineColor,
        x: e.clientX - bounded.left,
        y: e.clientY - bounded.top
      };
      setPoints(newPoints);
    }
  };

  const handleDeletePath = index => () => {
    const newPathes = cloneDeep(pathes);
    newPathes.splice(index, 1);
    setPathes(newPathes);
    saveHistory({ pathes: newPathes, points: [], texts, figures });
  };

  const handleDeleteFigure = index => () => {
    const newFigures = cloneDeep(figures);
    newFigures.splice(index, 1);
    setActive(null);
    setFigures(newFigures);
    saveHistory({ pathes, points: [], texts, figures: newFigures });
  };

  const handleClearPoints = () => {
    setPoints([]);
    saveHistory({ pathes, points: [], texts, figures });
  };

  const drawSquare = e => {
    if (active === null) {
      const newFigures = cloneDeep(figures);
      const bounded = svg.current.getBoundingClientRect();
      newFigures.push({
        strokeWidth: lineWidth,
        stroke: lineColor,
        fill: fillColor,
        width: 50,
        height: 50,
        x: e.clientX - bounded.left,
        y: e.clientY - bounded.top
      });
      setFigures(newFigures);
      saveHistory({ pathes, points: [], texts, figures: newFigures });
    } else if (e.target === svg.current) {
      setActive(null);
    }
  };

  const drawСircle = e => {
    if (active === null) {
      const newFigures = cloneDeep(figures);
      const bounded = svg.current.getBoundingClientRect();
      newFigures.push({
        strokeWidth: lineWidth,
        stroke: lineColor,
        fill: fillColor,
        rx: 50,
        ry: 50,
        cx: e.clientX - bounded.left,
        cy: e.clientY - bounded.top
      });
      setFigures(newFigures);
      saveHistory({ pathes, points: [], texts, figures: newFigures });
    } else if (e.target === svg.current) {
      setActive(null);
    }
  };

  const drawTriangle = e => {
    if (active === null) {
      const newFigures = cloneDeep(figures);
      const bounded = svg.current.getBoundingClientRect();
      const point = { x: e.clientX - bounded.left, y: e.clientY - bounded.top };
      newFigures.push({
        strokeWidth: lineWidth,
        stroke: lineColor,
        fill: fillColor,
        points: `${point.x},${point.y} ${point.x + 70},${point.y + 120} ${point.x},${point.y + 120}`
      });
      setFigures(newFigures);
      saveHistory({ pathes, points: [], texts, figures: newFigures });
    } else if (e.target === svg.current) {
      setActive(null);
    }
  };

  const drawText = e => {
    if (currentPosition.index === undefined) {
      const newTexts = cloneDeep(texts);
      const bounded = svg.current.getBoundingClientRect();
      const point = { x: e.clientX - bounded.left, y: e.clientY - bounded.top };
      newTexts.push({
        color: lineColor,
        lineWidth,
        value: "",
        x: point.x,
        y: point.y
      });
      setInputIsVisible(true);
      setCurrentPosition({
        x: point.x,
        y: point.y + 40,
        index: newTexts.length - 1
      });
      setTexts(newTexts);
      saveHistory({ pathes, points: [], figures, texts: newTexts });
    } else {
      setInputIsVisible(false);
      setCurrentPosition({ x: 0, y: 0 });
    }
  };

  const handleCurveMove = e => {
    const newPoints = cloneDeep(points);
    if (newPoints.length > 1) {
      const bounded = svg.current.getBoundingClientRect();

      newPoints[newPoints.length - 1] = {
        lineWidth,
        color: lineColor,
        x: e.clientX - bounded.left,
        y: e.clientY - bounded.top
      };

      setPoints(newPoints);
    }
  };

  const handleResizeRect = e => {
    if (mouseClicked && activeIndex !== null) {
      const newFigures = cloneDeep(figures);
      if (activeIndex === 1 || activeIndex === 2) {
        if (e.clientX < cursor.x) {
          newFigures[active].width -= cursor.x - e.clientX;
        } else {
          newFigures[active].width += e.clientX - cursor.x;
        }
      } else if (e.clientX < cursor.x) {
        newFigures[active].x -= cursor.x - e.clientX;
        newFigures[active].width += cursor.x - e.clientX;
      } else {
        newFigures[active].x += e.clientX - cursor.x;
        newFigures[active].width -= e.clientX - cursor.x;
      }
      if (activeIndex === 3 || activeIndex === 2) {
        if (e.clientY < cursor.y) {
          newFigures[active].height -= cursor.y - e.clientY;
        } else {
          newFigures[active].height += e.clientY - cursor.y;
        }
      } else if (e.clientY < cursor.y) {
        newFigures[active].y -= cursor.y - e.clientY;
        newFigures[active].height += cursor.y - e.clientY;
      } else {
        newFigures[active].y += e.clientY - cursor.y;
        newFigures[active].height -= e.clientY - cursor.y;
      }

      setCursor({ x: e.clientX, y: e.clientY });
      if (newFigures[active].width > 20 && newFigures[active].height > 20) {
        setFigures(newFigures);
      }
    }
    if (dragStart) {
      const newFigures = cloneDeep(figures);

      if (e.clientX < cursor.x) {
        newFigures[active].x -= cursor.x - e.clientX;
      } else {
        newFigures[active].x += e.clientX - cursor.x;
      }

      if (e.clientY < cursor.y) {
        newFigures[active].y -= cursor.y - e.clientY;
      } else {
        newFigures[active].y += e.clientY - cursor.y;
      }
      setCursor({ x: e.clientX, y: e.clientY });

      setFigures(newFigures);
    }
  };

  const handleResizeCircle = e => {
    if (mouseClicked && activeIndex !== null) {
      const newFigures = cloneDeep(figures);
      if (activeIndex === 1 || activeIndex === 2) {
        if (e.clientX < cursor.x) {
          newFigures[active].rx -= cursor.x - e.clientX;
        } else {
          newFigures[active].rx += e.clientX - cursor.x;
        }
      } else if (e.clientX < cursor.x) {
        newFigures[active].rx += cursor.x - e.clientX;
      } else {
        newFigures[active].rx -= e.clientX - cursor.x;
      }
      if (activeIndex === 3 || activeIndex === 2) {
        if (e.clientY < cursor.y) {
          newFigures[active].ry -= cursor.y - e.clientY;
        } else {
          newFigures[active].ry += e.clientY - cursor.y;
        }
      } else if (e.clientY < cursor.y) {
        newFigures[active].cy -= (cursor.y - e.clientY) / 2;
        newFigures[active].ry += (cursor.y - e.clientY) / 2;
      } else {
        newFigures[active].cy += (e.clientY - cursor.y) / 2;
        newFigures[active].ry -= (e.clientY - cursor.y) / 2;
      }

      setCursor({ x: e.clientX, y: e.clientY });
      if (newFigures[active].rx > 20 && newFigures[active].ry > 20) {
        setFigures(newFigures);
      }
    }
    if (dragStart) {
      const newFigures = cloneDeep(figures);

      if (e.clientX < cursor.x) {
        newFigures[active].cx -= cursor.x - e.clientX;
      } else {
        newFigures[active].cx += e.clientX - cursor.x;
      }

      if (e.clientY < cursor.y) {
        newFigures[active].cy -= cursor.y - e.clientY;
      } else {
        newFigures[active].cy += e.clientY - cursor.y;
      }
      setCursor({ x: e.clientX, y: e.clientY });

      setFigures(newFigures);
    }
  };

  const handleResizeTriangle = e => {
    if (mouseClicked && activeIndex !== null) {
      const newFigures = cloneDeep(figures);
      const currentPoints = newFigures[active].points.split(" ").map(item => {
        const point = item.split(",");
        return { x: Number(point[0]), y: Number(point[1]) };
      });

      currentPoints[activeIndex].x -= cursor.x - e.clientX;

      currentPoints[activeIndex].y -= cursor.y - e.clientY;

      newFigures[active].points = currentPoints.map(point => `${point.x},${point.y}`).join(" ");

      setCursor({ x: e.clientX, y: e.clientY });
      setFigures(newFigures);
    }
    if (dragStart) {
      const newFigures = cloneDeep(figures);
      const currentPoints = newFigures[active].points.split(" ").map(item => {
        const point = item.split(",");
        return { x: Number(point[0]), y: Number(point[1]) };
      });

      newFigures[active].points = currentPoints
        .map(point => {
          const xPoint = point.x - (cursor.x - e.clientX);
          const yPoint = point.y - (cursor.y - e.clientY);
          return `${xPoint},${yPoint}`;
        })
        .join(" ");

      setCursor({ x: e.clientX, y: e.clientY });

      setFigures(newFigures);
    }
  };

  const handleActive = index => e => {
    e.preventDefault();
    e.stopPropagation();
    if (!mouseClicked) {
      setActive(index);
    } else {
      setMouseClicked(false);
    }
  };

  const getPointsForDrawingPath = path =>
    `M ${path[0].x},${path[0].y} ${path.map((point, i) => (i !== 0 ? `L ${point.x},${point.y}` : "")).join(" ")}`;

  const mouseUpAndDownControl = (flag, index) => e => {
    e.preventDefault();
    e.stopPropagation();
    setMouseClicked(flag);
    if (flag) {
      setCursor({ x: e.clientX, y: e.clientY });
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
      setDragStart(false);
      saveHistory({ pathes, points: [], figures, texts });
    }
  };

  const renderActiveFigure = () => {
    let rects;
    if (!figures[active].cx && !figures[active].points) {
      rects = [
        { x: figures[active].x - 10, y: figures[active].y - 10 },
        {
          x: figures[active].x + figures[active].width - 10,
          y: figures[active].y - 10
        },
        {
          x: figures[active].x + figures[active].width - 10,
          y: figures[active].y + figures[active].height - 10
        },
        {
          x: figures[active].x - 10,
          y: figures[active].y + figures[active].height - 10
        }
      ];
    } else if (figures[active].cx !== undefined) {
      rects = [
        {
          x: figures[active].cx - figures[active].rx - 10,
          y: figures[active].cy - figures[active].ry - 10
        },
        {
          x: figures[active].cx + figures[active].rx - 10,
          y: figures[active].cy - figures[active].ry - 10
        },
        {
          x: figures[active].cx + figures[active].rx - 10,
          y: figures[active].cy + figures[active].ry - 10
        },
        {
          x: figures[active].cx - figures[active].rx - 10,
          y: figures[active].cy + figures[active].ry - 10
        }
      ];
    } else {
      const trianglePoints = figures[active].points.split(" ").map(item => {
        const point = item.split(",");
        return { x: point[0] - 10, y: point[1] - 10 };
      });

      return trianglePoints.map((point, i) => (
        <Rect
          key={i}
          onMouseDown={mouseUpAndDownControl(true, i)}
          onMouseUp={mouseUpAndDownControl(false)}
          fill="blue"
          {...point}
          height={20}
          width={20}
        />
      ));
    }
    return (
      <Fragment>
        <polygon
          points={rects.map(point => `${point.x + 10},${point.y + 10}`).join(" ")}
          fill="none"
          stroke="black"
          style={{ strokDashoffset: 0, strokeDasharray: 5 }}
        />
        {rects.map((point, i) => (
          <Rect
            key={i}
            onMouseDown={mouseUpAndDownControl(true, i)}
            onMouseUp={mouseUpAndDownControl(false)}
            fill="blue"
            {...point}
            height={20}
            width={20}
          />
        ))}
      </Fragment>
    );
  };

  const handleDragStart = i => e => {
    e.preventDefault();
    e.stopPropagation();
    setActive(i);
    setCursor({ x: e.clientX, y: e.clientY });
    setDragStart(true);
  };

  const handleDragEnd = i => e => {
    e.preventDefault();
    e.stopPropagation();
    setActive(i);
    setCursor({ x: e.clientX, y: e.clientY });
    setDragStart(false);
    saveHistory({ pathes, points: [], figures, texts });
  };

  const editText = index => () => {
    setInputValue(texts[index].value);
    setInputIsVisible(true);
    setCurrentPosition({ x: texts[index].x, y: texts[index].y + 40, index });
  };

  const handleBlur = () => {
    const newTexts = cloneDeep(texts);
    if (inputValue.trim()) {
      newTexts[currentPosition.index] = {
        ...newTexts[currentPosition.index],
        value: inputValue,
        x: currentPosition.x,
        y: currentPosition.y - 40
      };
    }
    setInputValue("");
    setInputIsVisible(false);
    setTexts(newTexts);
    saveHistory({ pathes, points: [], figures, texts: newTexts });
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleTextMove = e => {
    if (dragStart) {
      const newTexts = cloneDeep(texts);
      const xPoint = newTexts[active].x - (cursor.x - e.clientX);
      const yPoint = newTexts[active].y - (cursor.y - e.clientY);

      newTexts[active].x = xPoint;
      newTexts[active].y = yPoint;

      setCursor({ x: e.clientX, y: e.clientY });
      setTexts(newTexts);
    }
  };

  const getSvgHandlers = () => {
    if (scratchPadMode && !deleteMode) {
      switch (activeMode) {
        case drawTools.FREE_DRAW:
          return {
            onMouseUp: handleSavePath,
            onMouseDown: handleMouseDown,
            onMouseMove: handleMove
          };
        case drawTools.DRAW_BREAKING_LINE:
          return {
            onDoubleClick: handleSavePath,
            onClick: handlePoint("L"),
            onMouseMove: handleCurveMove
          };

        case drawTools.DRAW_SIMPLE_LINE:
          return {
            onMouseUp: handleSavePath,
            onMouseDown: handleMouseDown,
            onMouseMove: handleLineSecondPoint
          };

        case drawTools.DRAW_SQUARE:
          return {
            onMouseUp: drawSquare,
            onMouseMove: handleResizeRect
          };

        case drawTools.DRAW_CIRCLE:
          return {
            onMouseUp: drawСircle,
            onMouseMove: handleResizeCircle
          };

        case drawTools.DRAW_TRIANGLE:
          return {
            onMouseUp: drawTriangle,
            onMouseMove: handleResizeTriangle
          };

        case drawTools.DRAW_TEXT:
          return {
            onMouseUp: drawText,
            onMouseMove: handleTextMove
          };

        default:
      }
    } else {
      return {};
    }
  };

  const handleDeleteText = index => () => {
    const newTexts = cloneDeep(texts);
    newTexts.splice(index, 1);
    setTexts(newTexts);
    saveHistory({ pathes, points: [], figures, texts: newTexts });
  };

  const getMouseDownHandler = (mode, index) =>
    activeMode === mode && !deleteMode ? handleDragStart(index) : undefined;

  const getMouseUpHandler = (mode, index) => (activeMode === mode && !deleteMode ? handleDragEnd(index) : undefined);

  const getOnClickHandler = (mode, index) =>
    deleteMode ? handleDeleteFigure(index) : activeMode === mode ? handleActive(index) : undefined;

  const getDeleteTextHandler = index =>
    deleteMode ? handleDeleteText(index) : activeMode ? handleActive(index) : undefined;

  return (
    <Fragment>
      <ControlInput
        onChange={handleInputChange}
        onBlur={handleBlur}
        value={inputValue}
        inputIsVisible={inputIsVisible}
        x={currentPosition.x}
        y={currentPosition.y}
        size="large"
      />
      <svg
        ref={svg}
        {...getSvgHandlers()}
        width="100%"
        height={document.body.scrollHeight + 28}
        style={{
          background: "transparent",
          position: "absolute",
          top: 62,
          left: 0,
          display: scratchPadMode ? "block" : "none",
          zIndex: mouseClicked || dragStart || activeMode !== "" ? 1000 : 0
        }}
      >
        {figures.length > 0 &&
          figures.map((path, i) =>
            path.x ? (
              <Rect
                key={i}
                onMouseDown={getMouseDownHandler(drawTools.DRAW_SQUARE, i)}
                onMouseUp={getMouseUpHandler(drawTools.DRAW_SQUARE, i)}
                onClick={getOnClickHandler(drawTools.DRAW_SQUARE, i)}
                {...path}
              />
            ) : path.points ? (
              <Polygon
                key={i}
                onMouseDown={getMouseDownHandler(drawTools.DRAW_TRIANGLE, i)}
                onMouseUp={getMouseUpHandler(drawTools.DRAW_TRIANGLE, i)}
                onClick={getOnClickHandler(drawTools.DRAW_TRIANGLE, i)}
                {...path}
              />
            ) : (
              <Ellipse
                key={i}
                onMouseDown={getMouseDownHandler(drawTools.DRAW_CIRCLE, i)}
                onMouseUp={getMouseUpHandler(drawTools.DRAW_CIRCLE, i)}
                onClick={getOnClickHandler(drawTools.DRAW_CIRCLE, i)}
                {...path}
              />
            )
          )}

        {texts.length > 0 &&
          texts.map(
            (text, i) =>
              currentPosition.index !== i && (
                // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                <Text
                  onMouseDown={getMouseDownHandler(drawTools.DRAW_TEXT, i)}
                  onMouseUp={getMouseUpHandler(drawTools.DRAW_TEXT, i)}
                  onClick={getDeleteTextHandler(i)}
                  onDoubleClick={activeMode === drawTools.DRAW_TEXT ? editText(i) : undefined}
                  key={i}
                  color={text.color}
                  fontSize={text.lineWidth * 3}
                  x={text.x}
                  y={text.y}
                >
                  {text.value}
                </Text>
              )
          )}

        {pathes.length > 0 &&
          pathes.map((path, i) => (
            <Path
              key={i}
              onClick={deleteMode ? handleDeletePath(i) : undefined}
              stroke={path[0].color}
              strokeWidth={path[0].lineWidth}
              d={getPointsForDrawingPath(path)}
            />
          ))}

        {points.length > 0 && (
          <Path
            stroke={points[0].color}
            onClick={deleteMode ? handleClearPoints : undefined}
            strokeWidth={points[0].lineWidth}
            d={getPointsForDrawingPath(points)}
          />
        )}

        {active !== null && figures[active] && !deleteMode && activeMode !== drawTools.DRAW_TEXT && (
          <Fragment>{renderActiveFigure()}</Fragment>
        )}
      </svg>
    </Fragment>
  );
};

SvgDraw.propTypes = {
  lineColor: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired,
  activeMode: PropTypes.string.isRequired,
  scratchPadMode: PropTypes.bool.isRequired,
  deleteMode: PropTypes.bool.isRequired,
  history: PropTypes.any.isRequired,
  fillColor: PropTypes.string.isRequired,
  saveHistory: PropTypes.any.isRequired
};

export default SvgDraw;

const Path = styled.path`
  stroke-linecap: round;
  fill: none;
  stroke-linejoin: round;
`;

const Polygon = styled.polygon`
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const Ellipse = styled.ellipse`
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const Rect = styled.rect`
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const Text = styled.text`
  cursor: pointer;
  stroke: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}px;
`;

const ControlInput = styled(Input)`
  position: relative;
  display: ${({ inputIsVisible }) => (inputIsVisible ? "block" : "none")};
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  width: auto;
  height: 40px;
  z-index: 10000;
`;
