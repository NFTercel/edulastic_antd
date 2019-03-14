import React from "react";
import { StyledAxisTickText } from "../styled";

export const CustomChartXTick = props => {
  const { x, y, payload, getDataByIndex } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <StyledAxisTickText textAnchor="middle" verticalAnchor="start" width={70}>
        {payload.value + " (" + getDataByIndex(payload.index).qCount + ")"}
      </StyledAxisTickText>
    </g>
  );
};
