/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconDiskette = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="20.4" height="20.4" viewBox="0 0 20.4 20.4" {...props}>
    <g transform="translate(0 0)">
      <path
        d="M-1723.066-11.2h-18.667a.868.868,0,0,1-.867-.867V-30.733a.868.868,0,0,1,.867-.867h15.2a.843.843,0,0,1,.521.175l3.47,2.646a.844.844,0,0,1,.346.7v16.059A.858.858,0,0,1-1723.066-11.2Zm-10.417-11.459a3.609,3.609,0,0,0-3.6,3.6,3.608,3.608,0,0,0,3.6,3.6,3.608,3.608,0,0,0,3.6-3.6A3.614,3.614,0,0,0-1733.483-22.658Zm-3.909-7.25v2.821h7.812v-2.821Z"
        transform="translate(1742.6 31.6)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconDiskette);
