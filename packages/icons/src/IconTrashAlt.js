/* eslint-disable react/prop-types */
import React from 'react';

import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconTrashAlt = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.728 16.702" {...props}>
    <g transform="translate(-40.782 .5)">
      <path d="M48.889.522V0H45.4v.522h-4.12v2.112h11.73V.522z" />
      <path
        d="M57.546 80.756h8.939l.642-12.412H56.9zm5.486-9.511h1.107v6.325h-1.107zm-3.14 0H61v6.325h-1.108z"
        transform="translate(-14.87 -65.054)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconTrashAlt);
