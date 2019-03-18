import React from "react";
import { StyledAxisTickText } from "../styled";

export const CustomChartXTick = props => {
  const { x, y, payload, data } = props;

  const getDataByName = name => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === name) {
          return data[i].qCount;
        }
      }
    }
    return "";
  };

  return (
    <g transform={`translate(${x},${y})`}>
      <StyledAxisTickText textAnchor="middle" verticalAnchor="start" width={70}>
        {payload.value + " (" + getDataByName(payload.value) + ")"}
      </StyledAxisTickText>
    </g>
  );
};
