import React from 'react';
import withIconStyles from '@edulastic/icons/src/HOC/withIconStyles';
import SVG from '@edulastic/icons/src/common/SVG';

const IconGraphFilledCircle = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
    <circle cx="7" cy="7" r="7" />
  </SVG>
);

export default withIconStyles(IconGraphFilledCircle);
