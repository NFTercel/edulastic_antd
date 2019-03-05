/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconRoot = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.332 16.86" {...props}>
    <g transform="translate(-0.001 0)">
      <path
        d="M20.383,48.642H10.033l-4.063,14.3A.951.951,0,0,1,5.1,63.6H5.066a.951.951,0,0,1-.882-.6L2.523,58.853H.95a.95.95,0,0,1,0-1.9H3.166a.95.95,0,0,1,.882.6l.92,2.3L8.436,47.4a.95.95,0,0,1,.9-.659H20.383a.95.95,0,1,1,0,1.9Zm.512,12.764L17.151,57.2l3.568-3.961a.237.237,0,0,0-.176-.4H18.285a.239.239,0,0,0-.18.082L15.71,55.7l-2.377-2.776a.237.237,0,0,0-.18-.083h-2.36a.237.237,0,0,0-.177.4L14.144,57.2l-3.715,4.207a.237.237,0,0,0,.178.394h2.34a.236.236,0,0,0,.182-.085l2.479-2.975,2.538,2.977a.238.238,0,0,0,.181.083h2.391a.237.237,0,0,0,.177-.4Z"
        transform="translate(0 -46.742)"
        fill="#fff"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconRoot);
