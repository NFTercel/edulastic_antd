/* eslint-disable react/prop-types */
import React from 'react';

import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconCircle = props => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    // viewBox="0 0 9.282 15.799"
    {...props}
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    class="feather feather-arrow-up-circle"
  >
    {/* <g transform="rotate(180 55.38 7.9)"> */}
    {/* <g transform="translate(101.478)"> */}
    <circle cx="12" cy="12" r="10" />
    {/* </g> */}
    {/* </g> */}
  </SVG>
);

export default withIconStyles(IconCircle);
