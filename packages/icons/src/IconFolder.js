/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconFolder = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.545 18.34" {...props}>
    <g transform="translate(0.125 0.125)">
      <path
        className="a"
        d="M18.165,4.62V.565A.565.565,0,0,0,17.6,0H1.7a.565.565,0,0,0-.565.565V2.358A1.7,1.7,0,0,0,0,3.957V16.394a1.7,1.7,0,0,0,1.7,1.7H17.6a1.7,1.7,0,0,0,1.7-1.7V6.218a1.7,1.7,0,0,0-1.131-1.6ZM17.034,1.131V4.522H9.882L8.117,2.758a1.685,1.685,0,0,0-1.2-.5H2.261V1.131Zm1.131,15.263a.566.566,0,0,1-.565.565H1.7a.566.566,0,0,1-.565-.565V3.957A.566.566,0,0,1,1.7,3.392H6.918a.561.561,0,0,1,.4.166l1.93,1.93a.565.565,0,0,0,.4.166H17.6a.566.566,0,0,1,.565.565Zm0,0"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconFolder);
