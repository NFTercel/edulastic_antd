import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cloneDeep, isEqual } from "lodash";

import ArrowPair from "./components/ArrowPair";
import withGrid from "./HOC/withGrid";
import { getGridVariables, getReCalculatedPoints } from "./helpers";
import { Line } from "./styled";
import Circles from "./components/Circles";

const DotPlot = ({ data, saveAnswer, ui_style: { width, height, margin, yAxisCount, stepSize }, view }) => {
  const { padding, yAxisStep, changingStep, step } = getGridVariables(
    yAxisCount,
    stepSize,
    data,
    height,
    width,
    margin
  );

  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorY, setCursorY] = useState(null);

  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (!isEqual(data, localData)) {
      setLocalData(data);
    }
  }, [data]);

  useEffect(() => {
    setLocalData(data);
  }, []);

  const getPolylinePoints = () =>
    localData.map((dot, index) => `${step * index + step / 2 + 2},${height - margin - dot.y}`).join(" ");

  const getActivePoint = index =>
    active !== null
      ? +getPolylinePoints()
          .split(" ")
          [active].split(",")[index]
      : null;

  const onMouseMove = e => {
    const newLocalData = cloneDeep(localData);
    if (isMouseDown && cursorY) {
      newLocalData[activeIndex].y -= e.pageY - cursorY;
      setCursorY(e.pageY);
      setLocalData(newLocalData);
    }
  };

  const onMouseDown = index => e => {
    setCursorY(e.pageY);
    setActiveIndex(index);
    setIsMouseDown(true);
  };

  const onMouseUp = () => {
    setCursorY(null);
    setActiveIndex(null);
    setActive(null);
    setIsMouseDown(false);
    saveAnswer(getReCalculatedPoints(localData, { oldStep: yAxisStep, yAxisStep, yAxisCount, changingStep }));
  };

  return (
    <svg
      style={{ userSelect: "none" }}
      width={width + step - 20}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      height={height}
    >
      <Line x1={0} y1={height - margin} x2={width + step - 20 - margin} y2={height - margin} strokeWidth={1} />

      <Circles
        isMouseDown={activeIndex !== null}
        onPointOver={setActive}
        bars={localData}
        view={view}
        step={step}
        yAxisStep={yAxisStep}
        height={height}
        padding={padding}
        margin={margin}
        onMouseDown={onMouseDown}
      />
      <ArrowPair getActivePoint={getActivePoint} />
    </svg>
  );
};

DotPlot.propTypes = {
  data: PropTypes.array.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  ui_style: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.number,
    yAxisCount: PropTypes.number,
    stepSize: PropTypes.number
  }).isRequired,
  view: PropTypes.string.isRequired
};

export default withGrid(DotPlot);
