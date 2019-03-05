/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconHeart = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.957 16.1" {...props}>
    <g transform="translate(-6.56 -12.6)">
      <path d="M24.386 16.861a4.817 4.817 0 0 0-4.7-4.23 7.158 7.158 0 0 0-4.132 1.569 7.086 7.086 0 0 0-4.168-1.6 4.822 4.822 0 0 0-4.7 4.277c-.744 3.858 1.643 8.987 8.631 11.777a.6.6 0 0 0 .465 0c6.973-2.851 9.344-7.965 8.6-11.792z" />
    </g>
  </SVG>
);

export default withIconStyles(IconHeart);
