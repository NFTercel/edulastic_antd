import React from 'react';
import withIconStyles from '@edulastic/icons/src/HOC/withIconStyles';
import SVG from '@edulastic/icons/src/common/SVG';

const IconGraphSegment = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.153 23.206" {...props}>
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
      <circle
        cx="2.769"
        cy="2.769"
        r="2.769"
        transform="translate(292 481.155)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconGraphSegment);
