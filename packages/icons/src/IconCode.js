/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconCode = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.656 11.354" {...props}>
    <g transform="translate(0.375 0.375)">
      <path
        d="M6.331,119.647a.332.332,0,0,0-.109-.244l-.544-.531a.348.348,0,0,0-.5,0L.109,123.822a.329.329,0,0,0,0,.489l5.069,4.951a.348.348,0,0,0,.5,0l.544-.531a.329.329,0,0,0,0-.489l-4.275-4.176,4.275-4.176A.332.332,0,0,0,6.331,119.647Z"
        transform="translate(0 -118.765)"
      />
      <path
        d="M362.534,123.819l-5.069-4.951a.347.347,0,0,0-.5,0l-.544.531a.329.329,0,0,0,0,.489l4.275,4.176-4.275,4.176a.329.329,0,0,0,0,.489l.544.531a.348.348,0,0,0,.5,0l5.069-4.951a.329.329,0,0,0,0-.489Z"
        transform="translate(-342.736 -118.762)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconCode);
