import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cloneDeep, isEqual } from "lodash";

import HorizontalLines from "./components/HorizontalLines";
import ArrowPair from "./components/ArrowPair";
import withGrid from "./HOC/withGrid";
import { getGridVariables, getReCalculatedPoints } from "./helpers";
import Hists from "./components/Hists";

const Histogram = ({ data, saveAnswer, ui_style: { width, height, margin, yAxisCount, stepSize }, view }) => {
  const { yAxis, padding, yAxisStep, changingStep, step } = getGridVariables(
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
    localData
      .map((dot, index) => `${step * index + margin / 2 + padding + step / 2 - 10},${height - margin - dot.y}`)
      .join(" ");

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
      <HorizontalLines
        lines={yAxis}
        step={yAxisStep}
        height={height}
        width={width + step - 20}
        margin={margin}
        padding={padding}
      />

      <Hists
        isMouseDown={activeIndex !== null}
        onPointOver={setActive}
        bars={localData}
        view={view}
        step={step}
        height={height}
        padding={padding}
        margin={margin}
        onMouseDown={onMouseDown}
      />
      <ArrowPair getActivePoint={getActivePoint} />
    </svg>
  );
};

Histogram.propTypes = {
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

export default withGrid(Histogram);
