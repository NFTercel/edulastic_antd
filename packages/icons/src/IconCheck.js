/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconCheck = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.947 11.71" {...props}>
    <g transform="translate(0.001 -67.998)">
      <g transform="translate(0 67.997)">
        <path
          d="M15.712,68.231a.8.8,0,0,0-1.128,0L5.032,77.784,1.361,74.112A.8.8,0,1,0,.233,75.239l4.236,4.236a.8.8,0,0,0,1.128,0L15.712,69.359A.8.8,0,0,0,15.712,68.231Z"
          transform="translate(0 -67.997)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconCheck);
