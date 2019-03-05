import React from 'react';
import withIconStyles from '@edulastic/icons/src/HOC/withIconStyles';
import SVG from '@edulastic/icons/src/common/SVG';

const IconGraphDoublePlus = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.161 18.16" {...props}>
    <g transform="translate(-274 -488.813)">
      <g transform="translate(274 488.813)">
        <rect width="2.696" height="14.16" rx="1.348" transform="translate(5.732)" />
        <rect width="2.696" height="14.161" rx="1.348" transform="translate(0 8.428) rotate(-90)" />
      </g>
      <g transform="translate(283 492.813)">
        <rect width="2.696" height="14.16" rx="1.348" transform="translate(5.732)" />
        <rect width="2.696" height="14.161" rx="1.348" transform="translate(0 8.428) rotate(-90)" />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconGraphDoublePlus);
