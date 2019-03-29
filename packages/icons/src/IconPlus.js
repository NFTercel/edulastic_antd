/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconPlus = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="15.032" height="15.032" viewBox="0 0 15.032 15.032" {...props}>
    <g transform="translate(7.516) rotate(45)">
      <path d="M10.629,1.063,9.566,0,5.315,4.252,1.063,0,0,1.063,4.252,5.315,0,9.566l1.063,1.063L5.315,6.377l4.252,4.252,1.063-1.063L6.377,5.315Z" />
    </g>
  </SVG>
);

export default withIconStyles(IconPlus);
