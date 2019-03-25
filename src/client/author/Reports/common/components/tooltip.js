import React from "react";
import { Row, Col } from "antd";

export const CustomChartTooltip = props => {
  let { className, payload, getJSX } = props;
  const tooltip = getJSX(payload);
  return tooltip ? <div className={`chart-tooltip ${className}`}>{tooltip}</div> : <div />;
};
