/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconClockDashboard = props => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22.231 22.231"
    {...props}
  >
    <defs>{/* <style>.a{fill:#434b5d;}<//style> */}</defs>
    <g transform="translate(0)">
      <g transform="translate(0 0)">
        <path
          className="a"
          d="M11.045,22.091A11.046,11.046,0,0,1,3.235,3.235,11.045,11.045,0,1,1,18.856,18.856,10.974,10.974,0,0,1,11.045,22.091Zm0-20.71a9.665,9.665,0,1,0,9.665,9.664A9.675,9.675,0,0,0,11.045,1.381Z"
          transform="translate(0 0)"
        />
        <path
          className="a"
          d="M2.3,4.6A2.3,2.3,0,1,1,4.6,2.3,2.3,2.3,0,0,1,2.3,4.6Zm0-3.222a.92.92,0,1,0,.92.92A.921.921,0,0,0,2.3,1.381Z"
          transform="translate(8.744 10.585)"
        />
        <rect
          className="a"
          width="1.381"
          height="5.956"
          rx="0.69"
          transform="translate(10.355 5.983)"
        />
        <path
          className="a"
          d="M14.728,8.21a.92.92,0,1,1,.92.911A.915.915,0,0,1,14.728,8.21ZM0,8.21A.915.915,0,0,1,.92,7.3a.911.911,0,1,1,0,1.823A.916.916,0,0,1,0,8.21Zm12.84-4.5a.915.915,0,1,1,.641.265A.9.9,0,0,1,12.84,3.706ZM2.433,3.7a.911.911,0,1,1,1.295.007.9.9,0,0,1-.641.265A.921.921,0,0,1,2.433,3.7ZM7.373.92A.911.911,0,1,1,9.2.92a.911.911,0,1,1-1.823,0Z"
          transform="translate(2.761 2.752)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconClockDashboard);
