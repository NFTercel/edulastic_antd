import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Line, Text } from "../styled";

const VerticalLines = ({ lines, height, margin, step, padding }) => {
  const getConstantX = index => step * index + margin / 2 + padding;

  return (
    <g>
      {lines.map((dot, index) => (
        <Fragment>
          <Text textAnchor="middle" x={getConstantX(index)} y={height}>
            {dot.x}
          </Text>
          <Line
            x1={getConstantX(index)}
            y1={margin / 4}
            x2={getConstantX(index)}
            y2={height - margin / 2}
            strokeWidth={1}
          />
        </Fragment>
      ))}
    </g>
  );
};

VerticalLines.propTypes = {
  lines: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired
};

export default VerticalLines;
