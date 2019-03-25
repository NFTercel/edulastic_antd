import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Circle } from "../styled";
import { EDIT } from "../../../constants/constantsForQuestions";

const Points = ({ circles, step, padding, height, margin, onPointOver, onMouseDown, isMouseDown, view }) => {
  const handleMouseAction = value => () => {
    if (!isMouseDown) {
      onPointOver(value);
    }
  };

  const getCenterX = index => step * index + margin / 2 + padding;

  const getCenterY = dot => height - margin - dot.y;

  return (
    <Fragment>
      {circles.map(
        (dot, index) =>
          ((view !== EDIT && !dot.notInteractive) || view === EDIT) && (
            <Circle
              onMouseEnter={handleMouseAction(index)}
              onMouseLeave={handleMouseAction(null)}
              onMouseDown={onMouseDown(index)}
              cx={getCenterX(index)}
              cy={getCenterY(dot)}
              r={6}
            />
          )
      )}
    </Fragment>
  );
};

Points.propTypes = {
  circles: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  onPointOver: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  isMouseDown: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired
};

export default Points;
