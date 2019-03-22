/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconLeftArrow = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="16.387" height="12.621" viewBox="0 0 16.387 12.621" {...props}>
    <g transform="translate(16.387 71.451) rotate(180)">
      <g transform="translate(0 64.479)">
        <path
          d="M15.725,235.318H.662a.662.662,0,0,0,0,1.324H15.725a.662.662,0,1,0,0-1.324Z"
          transform="translate(0 -235.318)"
        />
      </g>
      <g transform="translate(0 58.83)">
        <path
          d="M1.6,65.141,6.779,59.96a.662.662,0,0,0-.936-.936L.194,64.673a.662.662,0,0,0,0,.936l5.649,5.649a.662.662,0,0,0,.936-.936Z"
          transform="translate(0 -58.83)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconLeftArrow);
