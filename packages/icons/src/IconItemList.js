/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconItemList = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 15.548" {...props}>
    <g transform="translate(0 -25)">
      <path className="a" d="M10.4,31.5a1.3,1.3,0,0,1-1.3,1.3H1.3a1.3,1.3,0,1,1,0-2.6H9.1A1.3,1.3,0,0,1,10.4,31.5ZM9.1,35.4H1.3a1.3,1.3,0,1,0,0,2.6H9.1a1.3,1.3,0,1,0,0-2.6Zm16.12-5.2H20.8V25.78c0-.718-.582-.78-1.3-.78s-1.3.062-1.3.78V30.2H13.91c-.718,0-.78.582-.78,1.3s.062,1.3.78,1.3H18.2v4.42c0,.718.582.78,1.3.78s1.3-.062,1.3-.78V32.8h4.42c.718,0,.78-.582.78-1.3S25.938,30.2,25.22,30.2ZM9.1,25H1.3a1.3,1.3,0,1,0,0,2.6H9.1a1.3,1.3,0,1,0,0-2.6Z" />
    </g>
  </SVG>
);

export default withIconStyles(IconItemList);
