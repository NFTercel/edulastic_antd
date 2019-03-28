import React from "react";
import PropTypes from "prop-types";

import { questionType } from "@edulastic/constants";
import { FlexContainer } from "@edulastic/common";

import { getYAxis, getPadding, getStep } from "../helpers";

const withGrid = WrappedComponent => {
  const hocComponent = props => {
    const {
      data,
      name,
      ui_style: { width, margin, yAxisCount, stepSize, xAxisLabel, yAxisLabel, chart_type }
    } = props;

    const yAxis = getYAxis(yAxisCount, stepSize);

    const padding = getPadding(yAxis);

    const calculateWidth = () => {
      switch (chart_type) {
        case questionType.BAR_CHART:
          return width + getStep(data, width, margin, padding);
        default:
          return width;
      }
    };

    return (
      <FlexContainer>
        <FlexContainer style={{ transform: "rotate(-90deg)", width: 40, whiteSpace: "nowrap", marginTop: margin }}>
          {yAxisLabel}
        </FlexContainer>
        <div>
          <FlexContainer style={{ width: calculateWidth(), marginBottom: 20 }} justifyContent="center">
            {name}
          </FlexContainer>
          <WrappedComponent {...props} />
          <FlexContainer
            style={{ width: calculateWidth(), marginTop: 10, marginLeft: padding / 2 }}
            justifyContent="center"
          >
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
