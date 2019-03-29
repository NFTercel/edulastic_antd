/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconNotes = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" {...props}>
    <g transform="translate(-1462.001 -166)">
      <rect width="18" height="18" rx="3" transform="translate(1462 168)" />
      <g transform="translate(1466 182) rotate(-90)">
        <rect fill="#1774f0" width="2" height="10" transform="translate(4)" />
        <rect fill="#1774f0" width="2" height="6.961" />
        <rect fill="#1774f0" width="2" height="9.961" transform="translate(8)" />
      </g>
      <g fill="#2582f2" stroke="#bed8fa" transform="translate(1468.812 166)">
        <circle stroke="none" cx="2" cy="2" r="2" />
        <circle stroke="none" cx="2" cy="2" r="1.5" />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconNotes);
