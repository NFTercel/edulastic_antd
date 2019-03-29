/* eslint-disable react/prop-types */
import React from "react";

import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconDeskTopMonitor = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="19.516" height="16.913" viewBox="0 0 19.516 16.913" {...props}>
    <g transform="translate(0 -36.543)">
      <path
        d="M19.037,37.021a1.566,1.566,0,0,0-1.149-.478H1.626a1.567,1.567,0,0,0-1.149.478A1.566,1.566,0,0,0,0,38.169V49.228a1.566,1.566,0,0,0,.478,1.149,1.566,1.566,0,0,0,1.149.478H7.156a2.126,2.126,0,0,1-.163.793,7.191,7.191,0,0,1-.325.711,1.124,1.124,0,0,0-.163.447.66.66,0,0,0,.65.651h5.2a.66.66,0,0,0,.651-.651,1.163,1.163,0,0,0-.163-.442,7.456,7.456,0,0,1-.325-.722,2.142,2.142,0,0,1-.163-.788h5.529a1.631,1.631,0,0,0,1.626-1.626V38.169A1.565,1.565,0,0,0,19.037,37.021Zm-.823,9.605a.329.329,0,0,1-.325.325H1.626a.329.329,0,0,1-.325-.325V38.169a.33.33,0,0,1,.325-.325H17.889a.33.33,0,0,1,.325.325v8.457Z"
        transform="translate(0 0)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconDeskTopMonitor);
