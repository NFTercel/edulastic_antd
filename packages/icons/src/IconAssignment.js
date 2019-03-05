/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconAssignment = props => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19.329 25.681"
    {...props}
  >
    <defs>{/* <style>.a{fill:#4aac8b;}</style> */}</defs>
    <g transform="translate(0)">
      <path
        className="a"
        d="M18.5,25.681H.828A.866.866,0,0,1,0,24.843V3.628a.86.86,0,0,1,.828-.837h3.59V2.513a.866.866,0,0,1,.828-.838H7a2.96,2.96,0,0,1,5.332,0h1.752a.866.866,0,0,1,.828.838v.279H18.5a.865.865,0,0,1,.828.837V24.843A.866.866,0,0,1,18.5,25.681ZM1.45,4.34V24.049H17.88V4.34H15.047v.844a.881.881,0,0,1-.85.845H5.132a.881.881,0,0,1-.849-.845V4.34Zm4.625-.991V4.466h7.18V3.349H11.8a.851.851,0,0,1-.8-.636,1.381,1.381,0,0,0-2.675,0,.85.85,0,0,1-.8.636Z"
        transform="translate(0 0)"
      />
      <rect
        className="a"
        width="1.526"
        height="8.016"
        rx="0.763"
        transform="translate(9.156 10.02)"
      />
      <rect
        className="a"
        width="1.526"
        height="8.016"
        rx="0.763"
        transform="translate(5.911 14.792) rotate(-90)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconAssignment);
