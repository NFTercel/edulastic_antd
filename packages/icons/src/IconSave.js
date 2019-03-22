/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconSave = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.639 17.64" {...props}>
    <path
      d="M17.479,4.021,13.62.162A.551.551,0,0,0,13.23,0H.552A.551.551,0,0,0,0,.552V17.089a.551.551,0,0,0,.551.551H17.089a.551.551,0,0,0,.551-.551V4.41a.551.551,0,0,0-.161-.39ZM9.923,1.1v2.2H4.41V1.1ZM4.41,16.538V9.923h8.82v6.615Zm12.127,0h-2.2V9.372a.551.551,0,0,0-.551-.551H3.859a.551.551,0,0,0-.551.551v7.166H1.1V1.1h2.2V3.859a.551.551,0,0,0,.551.551h6.615a.551.551,0,0,0,.551-.551V1.1H13l3.536,3.536Zm0,0"
      transform="translate(-0.001 0)"
    />
  </SVG>
);

export default withIconStyles(IconSave);
