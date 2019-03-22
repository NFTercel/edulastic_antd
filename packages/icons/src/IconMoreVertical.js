/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconMoreVertical = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="3" height="14" viewBox="0 0 3 14" {...props}>
    <g transform="translate(-1352.194 -4)">
      <g transform="translate(1202.861 4)">
        <g transform="translate(149.333 0)">
          <g transform="translate(0 0)">
            <circle cx="2" cy="2" r="1.8" />
          </g>
        </g>
        <g transform="translate(149.333 5)">
          <circle cx="2" cy="2" r="1.8" />
        </g>
        <g transform="translate(149.333 10)">
          <circle cx="2" cy="2" r="1.8" />
        </g>
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconMoreVertical);
