/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconCheckSmall = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="10.764" height="7.527" viewBox="0 0 10.764 7.527" {...props}>
    <path
      d="M139.336,169.644a.6.6,0,0,0-.855,0l-5.338,5.338-2.81-2.81a.6.6,0,0,0-.855.855l3.238,3.238a.6.6,0,0,0,.855,0l5.766-5.766A.6.6,0,0,0,139.336,169.644Z"
      transform="translate(-129.051 -169.165)"
    />
  </SVG>
);

export default withIconStyles(IconCheckSmall);
