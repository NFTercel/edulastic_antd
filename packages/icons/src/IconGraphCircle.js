import React from 'react';
import withIconStyles from '@edulastic/icons/src/HOC/withIconStyles';
import SVG from '@edulastic/icons/src/common/SVG';

const IconGraphCircle = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
    <g fill="none" strokeWidth="2" transform="translate(0)">
      <circle stroke="none" cx="7" cy="7" r="7" />
      <circle fill="none" cx="7" cy="7" r="6" />
    </g>
  </SVG>
);

export default withIconStyles(IconGraphCircle);
