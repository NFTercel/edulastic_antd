import React from "react";
import PropTypes from "prop-types";

import { Group } from "../styled";

const ArrowPair = ({ getActivePoint }) => {
  const getArrowUp = () =>
    getActivePoint(0) !== null
      ? `M ${getActivePoint(0)},${getActivePoint(1) + 20} ${getActivePoint(0) + 8},${getActivePoint(1) +
          10} ${getActivePoint(0) - 8},${getActivePoint(1) + 10} Z`
      : "";

  const getArrowDown = () =>
    getActivePoint(0) !== null
      ? `M ${getActivePoint(0)},${getActivePoint(1) - 20} ${getActivePoint(0) + 8},${getActivePoint(1) -
          10} ${getActivePoint(0) - 8},${getActivePoint(1) - 10} Z`
      : "";

  return (
    <Group active={getActivePoint(0)}>
      <path d={getArrowUp()} />
      <path d={getArrowDown()} />
    </Group>
  );
};

ArrowPair.propTypes = {
  getActivePoint: PropTypes.func.isRequired
};

export default ArrowPair;
