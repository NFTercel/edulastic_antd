/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconGraduationCap = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="20.873" height="15.002" viewBox="0 0 20.873 15.002" {...props}>
    <g transform="translate(0 -2)">
      <g transform="translate(0 2)">
        <path
          d="M19.355,7.821l-1.744.4v5.518c0,1.731-1.982,3.261-7.175,3.261s-7.175-1.53-7.175-3.261V8.223l-1.745-.4a1.957,1.957,0,0,1,0-3.814L10,2.05a1.994,1.994,0,0,1,.44-.05,1.967,1.967,0,0,1,.431.048l8.488,1.959a1.957,1.957,0,0,1,0,3.814Zm-3.049.7L10.876,9.778a1.978,1.978,0,0,1-.871,0L4.566,8.525v5.216c0,.721,1.957,1.957,5.87,1.957s5.87-1.236,5.87-1.957ZM19.063,6.55a.653.653,0,0,0,0-1.272l-8.48-1.957L10.436,3.3l-.147.016L1.81,5.278a.653.653,0,0,0,0,1.272l8.48,1.957.147.016.147-.016Z"
          transform="translate(0 -2)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconGraduationCap);
