/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconCaretDown = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.624 4.273" {...props}>
    <g>
      <path
        d="M8.464 64.094a.554.554 0 0 0-.379-.141H.539a.554.554 0 0 0-.379.141.428.428 0 0 0 0 .668l3.773 3.323a.58.58 0 0 0 .758 0l3.773-3.323a.428.428 0 0 0 0-.668z"
        transform="translate(0 -63.953)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconCaretDown);
