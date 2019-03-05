/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconAddItems = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.474 20.474" {...props}>
    <g transform="translate(0 0)">
      <path
        d="M156,160a.8.8,0,0,0,.8.8h2.4v2.4a.8.8,0,0,0,1.6,0v-2.4h2.4a.8.8,0,0,0,0-1.6h-2.4v-2.4a.8.8,0,0,0-1.6,0v2.4h-2.4A.8.8,0,0,0,156,160Z"
        transform="translate(-149.762 -149.762)"
      />
      <path
        d="M133.852,14.567l1.034-.429a.8.8,0,1,0-.612-1.478l-1.034.429a.8.8,0,0,0,.612,1.478Z"
        transform="translate(-127.438 -12.096)"
      />
      <path d="M10.237,0a.8.8,0,0,0,0,1.6A8.637,8.637,0,1,1,1.6,10.237a.8.8,0,0,0-1.6,0A10.237,10.237,0,1,0,10.237,0Z" />
      <path
        d="M60.588,61.38l.792-.792a.8.8,0,1,0-1.131-1.131l-.792.792a.8.8,0,1,0,1.131,1.131Z"
        transform="translate(-56.855 -56.855)"
      />
      <path
        d="M13.095,135.32a.8.8,0,0,0,1.045-.433l.429-1.034a.8.8,0,1,0-1.478-.612l-.429,1.034A.8.8,0,0,0,13.095,135.32Z"
        transform="translate(-12.097 -127.438)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconAddItems);
