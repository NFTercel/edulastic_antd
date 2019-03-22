/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconVisualization = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="18.21" height="13.645" viewBox="0 0 18.21 13.645" {...props}>
    <g transform="translate(0 -64.178)">
      <g transform="translate(0 64.178)">
        <g transform="translate(0 0)">
          <path
            d="M18.132,70.671a15.091,15.091,0,0,0-2.309-3.218,11.519,11.519,0,0,0-2.809-2.233A8.029,8.029,0,0,0,9.1,64.178a8.029,8.029,0,0,0-3.91,1.043,11.517,11.517,0,0,0-2.809,2.233A15.089,15.089,0,0,0,.077,70.671a.736.736,0,0,0,0,.658,15.086,15.086,0,0,0,2.309,3.218A11.519,11.519,0,0,0,5.195,76.78,8.029,8.029,0,0,0,9.1,77.823a8.029,8.029,0,0,0,3.91-1.043,11.519,11.519,0,0,0,2.809-2.233,15.091,15.091,0,0,0,2.309-3.218A.736.736,0,0,0,18.132,70.671ZM9.1,76.352a7.728,7.728,0,0,1-5.619-2.783A14.3,14.3,0,0,1,1.575,71c.7-1.212,3.4-5.351,7.53-5.351a7.728,7.728,0,0,1,5.619,2.783A14.3,14.3,0,0,1,16.635,71C15.934,72.212,13.237,76.352,9.1,76.352Z"
            transform="translate(0 -64.178)"
          />
        </g>
      </g>
      <g transform="translate(6.087 67.982)">
        <g transform="translate(0 0)">
          <path
            d="M174.158,171.142a3.018,3.018,0,1,0,3.018,3.018A3.022,3.022,0,0,0,174.158,171.142Z"
            transform="translate(-171.14 -171.142)"
          />
        </g>
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconVisualization);
