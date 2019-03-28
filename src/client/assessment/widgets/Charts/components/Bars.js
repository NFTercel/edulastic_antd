import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { Bar, ActiveBar } from "../styled";
import { EDIT } from "../../../constants/constantsForQuestions";

const Bars = ({ bars, step, padding, height, margin, onPointOver, onMouseDown, isMouseDown, view }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseAction = value => () => {
    if (!isMouseDown) {
      onPointOver(value);
    }
  };

  const getCenterX = index => step * index + margin / 2 + padding + step / 2 - 10 - (step * 0.8) / 2;

  const getCenterY = dot => height - margin - dot.y;

  const handleMouse = index => () => {
    handleMouseAction(index)();
    setHoveredIndex(index);
  };

  return (
    <Fragment>
      {bars.map((dot, index) => (
        <Fragment>
          <Bar
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            x={getCenterX(index)}
            y={getCenterY(dot)}
            width={step * 0.8}
            height={dot.y}
          />
          {((view !== EDIT && !dot.notInteractive) || view === EDIT) && (
            <ActiveBar
              onMouseEnter={handleMouse(index)}
              onMouseLeave={handleMouse(null)}
              onMouseDown={onMouseDown(index)}
              x={getCenterX(index)}
              y={getCenterY(dot)}
              width={step * 0.8}
              hoverState={hoveredIndex === index}
              height={hoveredIndex === index ? 5 : 1}
            />
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

Bars.propTypes = {
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

export default Bars;
