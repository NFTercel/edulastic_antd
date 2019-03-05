/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconEye = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.21 13.645" {...props}>
    <g transform="translate(0 -64.178)">
      <g transform="translate(0 64.178)">
        <g>
          <path
            d="M18.132 70.671a15.091 15.091 0 0 0-2.309-3.218 11.519 11.519 0 0 0-2.809-2.233A8.029 8.029 0 0 0 9.1 64.178a8.029 8.029 0 0 0-3.91 1.043 11.517 11.517 0 0 0-2.809 2.233 15.089 15.089 0 0 0-2.304 3.217.736.736 0 0 0 0 .658 15.086 15.086 0 0 0 2.309 3.218 11.519 11.519 0 0 0 2.809 2.233A8.029 8.029 0 0 0 9.1 77.823a8.029 8.029 0 0 0 3.91-1.043 11.519 11.519 0 0 0 2.809-2.233 15.091 15.091 0 0 0 2.309-3.218.736.736 0 0 0 .004-.658zM9.1 76.352a7.728 7.728 0 0 1-5.619-2.783A14.3 14.3 0 0 1 1.575 71c.7-1.212 3.4-5.351 7.53-5.351a7.728 7.728 0 0 1 5.619 2.783A14.3 14.3 0 0 1 16.635 71c-.701 1.212-3.398 5.352-7.535 5.352z"
            transform="translate(0 -64.178)"
          />
        </g>
      </g>
      <g transform="translate(6.087 67.982)">
        <g>
          <path
            d="M174.158 171.142a3.018 3.018 0 1 0 3.018 3.018 3.022 3.022 0 0 0-3.018-3.018z"
            transform="translate(-171.14 -171.142)"
          />
        </g>
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconEye);
