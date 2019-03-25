/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconPlusCircle = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19.999" {...props}>
    <g id="plusCircle">
      <path
        d="M10,0A10,10,0,1,0,20,10,9.971,9.971,0,0,0,10,0Zm5.454,10.454a.429.429,0,0,1-.455.455H11.136a.215.215,0,0,0-.227.227V15a.429.429,0,0,1-.455.455H9.545A.429.429,0,0,1,9.09,15V11.136a.215.215,0,0,0-.227-.227H5a.429.429,0,0,1-.455-.455V9.545A.429.429,0,0,1,5,9.09H8.863a.215.215,0,0,0,.227-.227V5a.429.429,0,0,1,.455-.455h.909A.429.429,0,0,1,10.909,5V8.863a.215.215,0,0,0,.227.227H15a.429.429,0,0,1,.455.455Z"
        transform="translate(0.001)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconPlusCircle);
