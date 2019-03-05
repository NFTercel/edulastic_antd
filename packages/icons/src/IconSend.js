/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconSend = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.987 13.94" {...props}>
    <g transform="translate(0.546 0.5)">
      <g transform="translate(0.001 0)">
        <g transform="translate(0)">
          <path
            d="M12.94.244A.263.263,0,0,0,12.931.2a.292.292,0,0,0-.019-.046c0-.008-.005-.017-.01-.025a.173.173,0,0,0-.012-.013.292.292,0,0,0-.032-.036.275.275,0,0,0-.036-.032S12.815.041,12.81.038s-.017-.006-.025-.01A.293.293,0,0,0,12.738.01.3.3,0,0,0,12.7,0a.289.289,0,0,0-.049,0A.253.253,0,0,0,12.6.008a.259.259,0,0,0-.029,0L.192,4.233a.281.281,0,0,0-.01.529L5.967,6.985l2.5,5.786a.282.282,0,0,0,.258.17h.014a.282.282,0,0,0,.254-.2L12.932.364a.211.211,0,0,0,0-.027A.266.266,0,0,0,12.942.29.28.28,0,0,0,12.94.244Z"
            transform="translate(-0.002 0)"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1"
          />
          <path
            d="M4.421,240a.281.281,0,0,0-.4,0L.084,243.94a.281.281,0,1,0,.4.4L4.421,240.4A.281.281,0,0,0,4.421,240Z"
            transform="translate(-0.001 -231.479)"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1"
          />
          <path
            d="M90.053,296l-1.97,1.97a.281.281,0,1,0,.4.4l1.97-1.97a.281.281,0,0,0-.4-.4Z"
            transform="translate(-84.906 -285.51)"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1"
          />
          <path
            d="M.282,210.451a.281.281,0,0,0,.2-.082l1.97-1.97a.281.281,0,0,0-.4-.4l-1.97,1.97a.281.281,0,0,0,.2.48Z"
            transform="translate(-0.001 -200.605)"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1"
          />
        </g>
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconSend);
