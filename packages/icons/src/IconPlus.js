/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconPlus = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.35 13.347" {...props}>
    <g id="plus">
      <rect width="2.541" height="13.347" rx="1" transform="translate(5.404)" />
      <rect width="2.541" height="13.35" rx="1" transform="rotate(-90 3.972 3.972)" />
    </g>
  </SVG>
);

export default withIconStyles(IconPlus);
