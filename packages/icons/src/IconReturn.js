/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconReturn = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.662 18.912" {...props}>
    <g transform="translate(0.001 -32.502)">
      <g transform="translate(0 32.502)">
        <path
          className="a"
          d="M12.206,32.5a9.47,9.47,0,0,0-9.273,7.611l-1.8-2.247L0,38.776l2.91,3.637a.729.729,0,0,0,.893.2l4.364-2.182-.651-1.3-3.207,1.6a8,8,0,1,1,7.9,9.23v1.455a9.456,9.456,0,0,0,0-18.912Z"
          transform="translate(0 -32.502)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconReturn);
