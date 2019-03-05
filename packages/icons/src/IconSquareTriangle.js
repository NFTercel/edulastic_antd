/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconSquareTriangle = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.027 21.018" {...props}>
    <g transform="translate(0.253 0.25)">
      <path
        d="M20.115,20.518H.4a.4.4,0,0,1-.4-.4V.4A.4.4,0,0,1,.247.031.4.4,0,0,1,.684.117L20.4,19.833a.4.4,0,0,1,.084.437A.39.39,0,0,1,20.115,20.518ZM3.848,8.214a.411.411,0,0,0-.154.031.4.4,0,0,0-.247.37v8.057a.4.4,0,0,0,.4.4H11.9a.4.4,0,0,0,.283-.685L4.13,8.332A.4.4,0,0,0,3.848,8.214Z"
        fill="#fff"
        stroke="#31afe7"
        strokeLinecap="round"
        strokeWidth="0.5"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconSquareTriangle);
