/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconSquare = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.807 18.024" {...props}>
    <g transform="translate(0.001 0)">
      <g transform="translate(1.614 1.719)" fill="#31afe7" stroke="#fff" strokeWidth="2">
        <rect width="15.331" height="15.331" stroke="none" />
        <rect x="1" y="1" width="13.331" height="13.331" fill="none" />
      </g>
      <g transform="translate(0 0)">
        <circle cx="2.351" cy="2.351" r="2.351" transform="translate(0 0)" fill="#fff" />
        <circle cx="2.351" cy="2.351" r="2.351" transform="translate(0 13.322)" fill="#fff" />
        <circle cx="2.351" cy="2.351" r="2.351" transform="translate(14.106 0)" fill="#fff" />
        <circle cx="2.351" cy="2.351" r="2.351" transform="translate(14.106 13.322)" fill="#fff" />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconSquare);
