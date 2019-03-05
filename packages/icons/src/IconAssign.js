/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconAssign = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.278 16.278" {...props}>
    <path d="M4.431,6.421,3.165,7.687l4.069,4.069,9.043-9.043L15.012,1.447,7.234,9.224Zm10.038,8.048H1.809V1.809h9.043V0H1.809A1.814,1.814,0,0,0,0,1.809v12.66a1.814,1.814,0,0,0,1.809,1.809h12.66a1.814,1.814,0,0,0,1.809-1.809V7.234H14.469Z" />
  </SVG>
);

export default withIconStyles(IconAssign);
