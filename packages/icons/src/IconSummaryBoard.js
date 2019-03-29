/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconSummaryBoard = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="19.516" height="19.01" viewBox="0 0 19.516 19.01" {...props}>
    <g transform="translate(0.001)">
      <rect width="8.757" height="4.003" />
      <rect width="8.757" height="13.01" transform="translate(0 6)" />
      <rect width="8.757" height="9.007" transform="translate(10.758 10)" />
      <rect width="8.757" height="8.01" transform="translate(10.758)" />
    </g>
  </SVG>
);

export default withIconStyles(IconSummaryBoard);
