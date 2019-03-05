/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconClose = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.635 15.635" {...props}>
    <g transform="translate(0 0)">
      <g transform="translate(0 0)">
        <path
          d="M9.5-37.189l5.791-5.791a1.182,1.182,0,0,0,0-1.673,1.182,1.182,0,0,0-1.673,0L7.825-38.862,2.034-44.653a1.182,1.182,0,0,0-1.673,0,1.183,1.183,0,0,0,0,1.673l5.791,5.791-5.8,5.8a1.182,1.182,0,0,0,0,1.673,1.178,1.178,0,0,0,.837.347,1.178,1.178,0,0,0,.836-.347l5.8-5.8,5.791,5.791a1.181,1.181,0,0,0,.837.347,1.18,1.18,0,0,0,.836-.347,1.182,1.182,0,0,0,0-1.673Z"
          transform="translate(-0.001 45)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconClose);
