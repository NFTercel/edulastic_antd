/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconShare = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="19.525" height="19.692" viewBox="0 0 19.525 19.692" {...props}>
    <g transform="translate(-2.006)">
      <g transform="translate(2.006)">
        <path
          d="M17.941,12.515a3.565,3.565,0,0,0-2.8,1.375L9.044,10.774a3.565,3.565,0,0,0,.137-.929,3.535,3.535,0,0,0-.163-1.007l6.067-3.1a3.572,3.572,0,1,0-.73-2.15,3.549,3.549,0,0,0,.138.931L8.4,7.634a3.585,3.585,0,1,0,.053,4.359l6.064,3.1a3.544,3.544,0,0,0-.164,1.009,3.588,3.588,0,1,0,3.588-3.589Z"
          transform="translate(-2.006)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconShare);
