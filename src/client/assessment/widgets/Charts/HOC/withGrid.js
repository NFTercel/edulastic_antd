import React from "react";
import PropTypes from "prop-types";

import { FlexContainer } from "@edulastic/common";
import { getYAxis, getPadding } from "../helpers";

const withGrid = WrappedComponent => {
  const hocComponent = props => {
    const {
      name,
      ui_style: { width, margin, yAxisCount, stepSize, xAxisLabel, yAxisLabel }
    } = props;

    const yAxis = getYAxis(yAxisCount, stepSize);

    const padding = getPadding(yAxis);

    return (
      <FlexContainer>
        <FlexContainer style={{ transform: "rotate(-90deg)", width: 40, whiteSpace: "nowrap", marginTop: margin }}>
          {yAxisLabel}
        </FlexContainer>
        <div>
          <FlexContainer style={{ width, marginBottom: 20 }} justifyContent="center">
            {name}
          </FlexContainer>
          <WrappedComponent {...props} />
          <FlexContainer style={{ width, marginTop: 10, marginLeft: padding / 2 }} justifyContent="center">
            {xAxisLabel}
          </FlexContainer>
        </div>
      </FlexContainer>
    );
  };

  hocComponent.propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    ui_style: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      padding: PropTypes.number,
      margin: PropTypes.number,
      yAxisCount: PropTypes.number,
      stepSize: PropTypes.number
    })
  };

  hocComponent.defaultProps = {
    ui_style: {
      width: 640,
      height: 440,
      padding: 20,
      margin: 40,
      yAxisCount: 70,
      stepSize: 5
    }
  };

  return hocComponent;
};

export default withGrid;
