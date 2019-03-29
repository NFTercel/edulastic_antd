import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { Bar, ActiveBar, Text } from "../styled";
import { EDIT } from "../../../constants/constantsForQuestions";

const Hists = ({ bars, step, padding, height, margin, onPointOver, onMouseDown, isMouseDown, view }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseAction = value => () => {
    if (!isMouseDown) {
      onPointOver(value);
    }
  };

  const getCenterX = index => step * index + margin / 2 + padding - 10;

  const getCenterY = dot => height - margin - dot.y;

  const handleMouse = index => () => {
    handleMouseAction(index)();
    setHoveredIndex(index);
  };

  const Colors = [
    "#587C02",
    "#F25515",
    "#FBDEAD",
    "#5AD81C",
    "#A84A08",
    "#025F1C",
    "#5EB950",
    "#6494BF",
    "#C852BE",
    "#F325A1"
  ];

  return (
    <Fragment>
      {bars.map((dot, index) => (
        <Fragment>
          <Bar
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            x={getCenterX(index)}
            y={getCenterY(dot)}
            width={step - 2}
            height={dot.y}
            color={Colors[index % 10]}
          />
          {((view !== EDIT && !dot.notInteractive) || view === EDIT) && (
            <ActiveBar
              onMouseEnter={handleMouse(index)}
              onMouseLeave={handleMouse(null)}
              onMouseDown={onMouseDown(index)}
              x={getCenterX(index)}
              y={getCenterY(dot)}
              width={step - 2}
              color={Colors[index % 10]}
              hoverState={hoveredIndex === index}
              height={hoveredIndex === index ? 5 : 1}
            />
          )}
          <Text textAnchor="middle" x={getCenterX(index) + step / 2} y={height}>
            {dot.x}
          </Text>
        </Fragment>
      ))}
    </Fragment>
  );
};

Hists.propTypes = {
  bars: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  onPointOver: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  isMouseDown: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired
};

export default Hists;
