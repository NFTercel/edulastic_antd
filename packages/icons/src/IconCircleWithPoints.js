/* eslint-disable react/prop-types */
import React from 'react';

import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconCircleWithPoints = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.307 21.112" {...props}>
    <g transform="translate(-0.402 0)">
      <g transform="translate(2.42 2.421)" fill="none" stroke="#fff" strokeWidth="2">
        <circle cx="8.069" cy="8.069" r="8.069" stroke="none" />
        <circle cx="8.069" cy="8.069" r="7.069" fill="none" />
      </g>
      <g transform="translate(10.347 0) rotate(45)">
        <g transform="translate(0 0)" fill="#fff" stroke="#fff" strokeWidth="1">
          <circle cx="2.017" cy="2.017" r="2.017" stroke="none" />
          <circle cx="2.017" cy="2.017" r="1.517" fill="none" />
        </g>
        <g transform="translate(0.571 10.599)" fill="#fff" stroke="#fff" strokeWidth="1">
          <circle cx="2.017" cy="2.017" r="2.017" stroke="none" />
          <circle cx="2.017" cy="2.017" r="1.517" fill="none" />
        </g>
        <g transform="translate(11.189 0.571)" fill="#fff" stroke="#fff" strokeWidth="1">
          <circle cx="2.017" cy="2.017" r="2.017" stroke="none" />
          <circle cx="2.017" cy="2.017" r="1.517" fill="none" />
        </g>
        <g transform="translate(11.189 10.599)" fill="#fff" stroke="#fff" strokeWidth="1">
          <circle cx="2.017" cy="2.017" r="2.017" stroke="none" />
          <circle cx="2.017" cy="2.017" r="1.517" fill="none" />
        </g>
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconCircleWithPoints);
