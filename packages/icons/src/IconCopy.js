/* eslint-disable react/prop-types */
import React from 'react';

import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconCopy = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.797 18.797" {...props}>
    <g transform="translate(0 0)">
      <g transform="translate(0 3.357)">
        <path
          d="M13.427,85.333H2.014A2.014,2.014,0,0,0,0,87.347V98.76a2.014,2.014,0,0,0,2.014,2.014H13.427a2.014,2.014,0,0,0,2.014-2.014V87.347A2.014,2.014,0,0,0,13.427,85.333ZM14.1,98.76a.671.671,0,0,1-.671.671H2.014a.671.671,0,0,1-.671-.671V87.347a.671.671,0,0,1,.671-.671H13.427a.671.671,0,0,1,.671.671Z"
          transform="translate(0 -85.333)"
        />
      </g>
      <g transform="translate(2.685)">
        <path
          d="M82.365,0H70.281a2.014,2.014,0,0,0-2.014,2.014.671.671,0,1,0,1.343,0,.671.671,0,0,1,.671-.671H82.365a.671.671,0,0,1,.671.671V14.1a.671.671,0,0,1-.671.671.671.671,0,0,0,0,1.343A2.014,2.014,0,0,0,84.379,14.1V2.014A2.014,2.014,0,0,0,82.365,0Z"
          transform="translate(-68.267)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconCopy);
