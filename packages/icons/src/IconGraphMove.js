import React from 'react';
import withIconStyles from '@edulastic/icons/src/HOC/withIconStyles';
import SVG from '@edulastic/icons/src/common/SVG';

const IconGraphMove = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.98 23.98" stroke="none" style={{ stroke: 'none' }} {...props}>
    <path d="M5.187,17.177,0,11.99,5.187,6.8V10.8H10.8V5.187H6.8L11.99,0l5.187,5.187H13.183V10.8h5.61V6.8L23.98,11.99l-5.187,5.187V13.183h-5.61v5.61h3.994L11.99,23.98,6.8,18.793H10.8v-5.61H5.187Z"/>
  </SVG>
);

export default withIconStyles(IconGraphMove);
