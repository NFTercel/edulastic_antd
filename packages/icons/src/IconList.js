/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconList = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.788 15.548" {...props}>
    <g transform="translate(0 0)">
      <path
        d="M19.081,347.177H.707a.68.68,0,0,0-.5.21.68.68,0,0,0-.21.5v2.827a.68.68,0,0,0,.21.5.68.68,0,0,0,.5.21H19.081a.717.717,0,0,0,.707-.707v-2.827a.717.717,0,0,0-.707-.707ZM18.375,350Z"
        transform="translate(0 -335.87)"
      />
      <path
        d="M19.081,201H.707a.679.679,0,0,0-.5.21.679.679,0,0,0-.21.5v2.827a.679.679,0,0,0,.21.5.68.68,0,0,0,.5.21H19.081a.717.717,0,0,0,.707-.707v-2.827a.717.717,0,0,0-.707-.707Z"
        transform="translate(0 -195.346)"
      />
      <path
        d="M19.578,55.029a.68.68,0,0,0-.5-.21H.707a.68.68,0,0,0-.5.21.68.68,0,0,0-.21.5v2.827a.679.679,0,0,0,.21.5.68.68,0,0,0,.5.21H19.081a.717.717,0,0,0,.707-.707V55.526A.68.68,0,0,0,19.578,55.029Z"
        transform="translate(0 -54.819)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconList);
