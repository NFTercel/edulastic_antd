/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconCollapse = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.645 13.346" {...props}>
    <g transform="translate(0 -5.434)">
      <g transform="translate(0 5.434)">
        <g transform="translate(0 0)">
          <path d="M3.127,8.561H0V9.87H4.436V5.434H3.127Z" transform="translate(0 -5.434)" />
          <path
            d="M336.209,8.561V5.434H334.9V9.87h4.436V8.561Z"
            transform="translate(-325.691 -5.434)"
          />
          <path d="M0,330.774H3.127V333.9H4.436v-4.436H0Z" transform="translate(0 -320.555)" />
          <path
            d="M334.9,333.9h1.309v-3.127h3.127v-1.309H334.9Z"
            transform="translate(-325.691 -320.555)"
          />
        </g>
        <rect width="4.394" height="2.96" transform="translate(4.626 5.193)" />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconCollapse);
