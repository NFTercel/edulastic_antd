/* eslint-disable react/prop-types */
import React from 'react';

import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconCursor = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.446 15.669" {...props}>
    <g id="cursor" transform="translate(-85.328)">
      <g id="Group_16" data-name="Group 16" transform="translate(85.328)">
        <path
          id="Path_44"
          d="M95.679 9.889L85.886.1a.327.327 0 0 0-.558.231V14.69a.327.327 0 0 0 .579.207l2.608-3.187 1.74 3.77a.327.327 0 0 0 .3.189.32.32 0 0 0 .129-.027l2.285-.979a.326.326 0 0 0 .168-.437l-1.745-3.78h4.06a.327.327 0 0 0 .231-.558z"
          className="cls-1"
          data-name="Path 44"
          transform="translate(-85.328)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconCursor);
