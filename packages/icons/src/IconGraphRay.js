import React from 'react';
import withIconStyles from '@edulastic/icons/src/HOC/withIconStyles';
import SVG from '@edulastic/icons/src/common/SVG';

const IconGraphRay = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.737 23.206" {...props}>
    <g transform="translate(15.056 -558.511) rotate(30)">
      <path
        fill="none"
        strokeLinecap="round"
        strokeWidth="2"
        d="M292.38,486l-14.988,14.988"
        transform="translate(0.848 -0.151)"
      />
      <circle
        cx="3.769"
        cy="3.769"
        r="3.769"
        transform="translate(274 497.155)"
      />
      <path
        d="M0,0H5.809L2.693,3.167,0,5.809Z"
        transform="translate(296.033 483.382) rotate(90)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconGraphRay);
