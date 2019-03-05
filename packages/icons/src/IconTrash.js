/* eslint-disable react/prop-types */
import React from 'react';

import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconTrash = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.397 15.702" {...props}>
    <g>
      <path d="M50.62.522V0h-4.28v.522h-5.058v2.112h14.4V.522z" transform="translate(-41.282)" />
      <path
        d="M57.714 80.756h11.273l.81-12.412H56.9zm6.919-9.511h1.4v6.325h-1.4zm-3.96 0h1.4v6.325h-1.4z"
        transform="translate(-56.152 -65.054)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconTrash);
