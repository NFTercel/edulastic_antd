/* eslint-disable react/prop-types */
import React from 'react';

import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconEraseText = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.756 17.872" {...props}>
    <g transform="translate(0.001 -42.515)">
      <path d="M20.161,59.2H11.674l8.908-8.908a.6.6,0,0,0,0-.841l-6.76-6.76a.595.595,0,0,0-.841,0L.174,55.5a.6.6,0,0,0,0,.841L4.05,60.213a.594.594,0,0,0,.42.174H20.161a.595.595,0,0,0,0-1.19ZM13.4,43.951,19.32,49.87l-7,7L6.4,50.951ZM9.992,59.2H4.717L1.436,55.916,5.56,51.792l5.919,5.919Z" />
    </g>
  </SVG>
);

export default withIconStyles(IconEraseText);
