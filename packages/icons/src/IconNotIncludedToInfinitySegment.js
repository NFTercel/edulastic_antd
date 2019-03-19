/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconNotIncludedToInfinitySegment = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.778 15.555" {...props}>
    <g transform="translate(454.76 1499.777) rotate(180)">
      <g transform="translate(440.76 1485)" fill="none" strokeWidth="2">
        <circle cx="7" cy="7" r="7" stroke="none" />
        <circle cx="7" cy="7" r="6" fill="none" />
      </g>
      <line x2="33" transform="translate(408.26 1492.5)" strokeWidth="2" />
      <path d="M0,0H11L5.1,6,0,11Z" transform="translate(400.981 1492) rotate(-45)" />
    </g>
  </SVG>
);

export default withIconStyles(IconNotIncludedToInfinitySegment);
