import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Line, Text } from "../styled";

const HorizontalLines = ({ lines, height, width, margin, step, padding }) => {
  const getConstantY = dot => height - margin - step * dot;

  return (
    <g>
      {lines.map(dot => (
        <Fragment>
          <Text textAnchor="start" x={0} y={getConstantY(dot)} transform="translate(0, 5)">
            {dot}
          </Text>
          <Line x1={padding} y1={getConstantY(dot)} x2={width} y2={getConstantY(dot)} strokeWidth={1} />
        </Fragment>
      ))}
    </g>
  );
};

HorizontalLines.propTypes = {
  lines: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired
};

export default HorizontalLines;
