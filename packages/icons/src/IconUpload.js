/* eslint-disable react/prop-types */
import React from 'react';

import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconUpload = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.855 77.214" {...props}>
    <g transform="translate(0 -31.009)">
      <g transform="translate(0 84.021)">
        <path className="a" d="M85.619,339.95a2.237,2.237,0,0,0-2.237,2.237v8.546a8.956,8.956,0,0,1-8.946,8.946H13.419a8.956,8.956,0,0,1-8.946-8.946v-8.546a2.237,2.237,0,1,0-4.473,0v8.546a13.434,13.434,0,0,0,13.419,13.419H74.436a13.434,13.434,0,0,0,13.419-13.419v-8.546A2.236,2.236,0,0,0,85.619,339.95Z" transform="translate(0 -339.95)" />
      </g>
      <g transform="translate(13.579 92.833)">
        <path className="a" d="M137.595,391.3H81.37a2.237,2.237,0,0,0,0,4.473h56.225a2.237,2.237,0,0,0,0-4.473Z" transform="translate(-79.133 -391.305)" />
      </g>
      <g transform="translate(20.723 31.009)">
        <path className="a" d="M166.429,49.167,147.7,32.432a5.587,5.587,0,0,0-7.45,0L121.513,49.167a2.237,2.237,0,1,0,2.98,3.336l17.242-15.4V80.446a2.237,2.237,0,1,0,4.473,0V37.1L163.45,52.5a2.236,2.236,0,1,0,2.98-3.336Z" transform="translate(-120.766 -31.009)" />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconUpload);
