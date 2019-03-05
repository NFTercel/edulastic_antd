/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconMoveArrows = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.669 16" {...props}>
    <path d="M18.669 8l-3.5-3v2H10.5V3h2.334l-3.5-3-3.5 3h2.334v4H3.5V5L0 8l3.5 3V9h4.668v4H5.834l3.5 3 3.5-3H10.5V9h4.667v2z" />
  </SVG>
);

export default withIconStyles(IconMoveArrows);
