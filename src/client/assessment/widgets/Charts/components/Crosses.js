import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { mainBlueColor } from "@edulastic/colors";
import { Bar, ActiveBar, Text, StrokedRect } from "../styled";
import { EDIT } from "../../../constants/constantsForQuestions";

const Crosses = ({ bars, step, yAxisStep, height, margin, onPointOver, onMouseDown, isMouseDown, view }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseAction = value => () => {
    if (!isMouseDown) {
      onPointOver(value);
    }
  };

  const getCenterX = index => step * index + 2;

  const getCenterY = dot => height - margin - dot.y;

  const handleMouse = index => () => {
    handleMouseAction(index)();
    setHoveredIndex(index);
  };

  return (
    <Fragment>
      {bars.map((dot, index) => (
        <Fragment>
          {Array.from({ length: Math.floor(dot.y / yAxisStep) }).map((a, ind) => (
            <path
              transform={`translate(${getCenterX(index) + step / 2 - 17}, ${height -
                margin -
                17 -
                ind * yAxisStep -
                yAxisStep / 2})`}
              fill={mainBlueColor}
              d="M24.778,21.419L19.276,15.917L24.777,10.415L21.949,7.585L16.447,13.087L10.945,7.585L8.117,10.415L13.618,15.917L8.116,21.419L10.946,24.248L16.447,18.746L21.948,24.248Z"
            />
          ))}
          <Bar
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            x={getCenterX(index)}
            y={getCenterY(dot)}
            width={step - 2}
            height={dot.y}
            color="transparent"
          />
          {((view !== EDIT && !dot.notInteractive) || view === EDIT) && (
            <Fragment>
              <StrokedRect
                hoverState={hoveredIndex === index}
                x={getCenterX(index)}
                y={getCenterY(dot)}
                width={step - 2}
                height={dot.y}
              />
              <ActiveBar
                onMouseEnter={handleMouse(index)}
                onMouseLeave={handleMouse(null)}
                onMouseDown={onMouseDown(index)}
                x={getCenterX(index)}
                y={getCenterY(dot) - 4}
                width={step - 2}
                color={dot.y === 0 ? mainBlueColor : "transparent"}
                hoverState={hoveredIndex === index}
                height={hoveredIndex === index ? 5 : 1}
              />
            </Fragment>
          )}
          <Text textAnchor="middle" x={getCenterX(index) + step / 2} y={height}>
            {dot.x}
          </Text>
        </Fragment>
      ))}
    </Fragment>
  );
};

Crosses.propTypes = {
  bars: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  yAxisStep: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  onPointOver: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  isMouseDown: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired
};

export default Crosses;
