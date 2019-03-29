/* eslint-disable react/prop-types */
import React from "react";

import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconArrowCircleUp = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" {...props}>
    <g transform="translate(-513 -159)">
      <circle className="a" cx="19" cy="19" r="19" transform="translate(513 159)" fill="#edf5fc" />
      <path
        className="b"
        fill="#4ca4e8"
        d="M61.846,15.277a.842.842,0,0,0,.6-.248l6.167-6.167L71.4,11.647a.846.846,0,0,0,1.2,0l8.7-8.751V4.227a.846.846,0,1,0,1.691,0V.845h0A.845.845,0,0,0,82.165,0H78.759a.846.846,0,1,0,0,1.691h1.349L71.992,9.851,69.209,7.068a.845.845,0,0,0-1.2,0l-6.765,6.765a.846.846,0,0,0,.6,1.444Zm0,0"
        transform="translate(460 170.001)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconArrowCircleUp);
