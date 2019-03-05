/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconTile = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.702 18.702" {...props}>
    <g transform="translate(0 0)">
      <path
        d="M7.066,14.93h7.2a.659.659,0,0,0,.666-.666v-7.2a.659.659,0,0,0-.666-.666h-7.2a.659.659,0,0,0-.666.666v7.2A.68.68,0,0,0,7.066,14.93Z"
        transform="translate(-6.4 -6.4)"
      />
      <path
        d="M7.066,14.93h7.2a.659.659,0,0,0,.666-.666v-7.2a.659.659,0,0,0-.666-.666h-7.2a.659.659,0,0,0-.666.666v7.2A.68.68,0,0,0,7.066,14.93Z"
        transform="translate(-6.4 3.772)"
      />
      <path
        d="M7.066,14.93h7.2a.659.659,0,0,0,.666-.666v-7.2a.659.659,0,0,0-.666-.666h-7.2a.659.659,0,0,0-.666.666v7.2A.68.68,0,0,0,7.066,14.93Z"
        transform="translate(3.772 -6.4)"
      />
      <path
        d="M7.066,14.93h7.2a.659.659,0,0,0,.666-.666v-7.2a.659.659,0,0,0-.666-.666h-7.2a.659.659,0,0,0-.666.666v7.2A.68.68,0,0,0,7.066,14.93Z"
        transform="translate(3.772 3.772)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconTile);
