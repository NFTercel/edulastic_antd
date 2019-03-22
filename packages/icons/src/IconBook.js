/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconBook = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="14.547" height="18.571" viewBox="0 0 14.547 18.571" {...props}>
    <g transform="translate(0.25 0.25)">
      <path d="M14.047,17.012v1.059H2.135A2.135,2.135,0,0,1,0,15.936V2.135A2.135,2.135,0,0,1,2.135,0H14.047V14.895a1.059,1.059,0,0,0,0,2.118ZM12.988,1.059H2.135A1.078,1.078,0,0,0,1.059,2.135V14.12a2.1,2.1,0,0,1,1.059-.284H12.988ZM2.118,14.895a1.059,1.059,0,1,0,0,2.118h10.1a2.115,2.115,0,0,1,0-2.118Zm0,0" />
    </g>
  </SVG>
);

export default withIconStyles(IconBook);
