/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconBookMarkButton = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="15.939" height="19.924" viewBox="0 0 15.939 19.924" {...props}>
    <g transform="translate(-50.999 0)">
      <g transform="translate(51)">
        <path
          d="M64.947,19.924a2,2,0,0,0,1.992-1.992V1.992A2,2,0,0,0,64.947,0H58.969V6.973l-2.49-1.494-2.49,1.494V0h-1A2,2,0,0,0,51,1.992V17.931a2,2,0,0,0,1.992,1.992Z"
          transform="translate(-51)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconBookMarkButton);
