/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconMore = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.308 7.392" {...props}>
    <g transform="translate(0.25 0.25)">
      <path
        className="a"
        d="M6.891,34.62a3.445,3.445,0,1,0-3.446,3.445A3.45,3.45,0,0,0,6.891,34.62Zm-5.677,0A2.232,2.232,0,1,1,3.445,36.85,2.235,2.235,0,0,1,1.213,34.62Z"
        transform="translate(0 -31.172)"
      />
      <path
        className="a"
        d="M38.063,34.62a3.445,3.445,0,1,0-3.446,3.445A3.45,3.45,0,0,0,38.063,34.62Zm-3.446,2.23a2.232,2.232,0,1,1,2.232-2.231A2.233,2.233,0,0,1,34.617,36.85Z"
        transform="translate(-21.713 -31.172)"
      />
      <path
        className="a"
        d="M65.789,31.171a3.446,3.446,0,1,0,3.446,3.447A3.45,3.45,0,0,0,65.789,31.171Zm0,5.677a2.232,2.232,0,1,1,2.232-2.231A2.234,2.234,0,0,1,65.789,36.848Z"
        transform="translate(-43.427 -31.171)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconMore);
