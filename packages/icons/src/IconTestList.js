/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconTestList = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 15.548" {...props}>
    <g transform="translate(0 -5)">
      <g transform="translate(0 -20)">
        <path className="a" d="M10.4,31.5a1.3,1.3,0,0,1-1.3,1.3H1.3a1.3,1.3,0,1,1,0-2.6H9.1A1.3,1.3,0,0,1,10.4,31.5ZM9.1,35.4H1.3a1.3,1.3,0,1,0,0,2.6H9.1a1.3,1.3,0,1,0,0-2.6ZM9.1,25H1.3a1.3,1.3,0,1,0,0,2.6H9.1a1.3,1.3,0,1,0,0-2.6Z" />
      </g>
      <g transform="translate(13.701 0.637)">
        <g transform="translate(0 5.814)">
          <path className="a" d="M5.567,14.565a1.428,1.428,0,0,1-2.02,0L.418,11.436a1.428,1.428,0,0,1,2.02-2.019L4.3,11.281a.362.362,0,0,0,.51,0L9.861,6.232a1.428,1.428,0,1,1,2.02,2.019Z" transform="translate(0 -5.814)" />
        </g>
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconTestList);
