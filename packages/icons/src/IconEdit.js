/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconEdit = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.743 21.74" {...props}>
    <g transform="translate(0 0)">
      <path
        className="a"
        d="M20.335,1.435a4.8,4.8,0,0,0-6.787,0L1.1,13.874a.622.622,0,0,0-.176.357L.006,21.059a.621.621,0,0,0,.176.523.633.633,0,0,0,.44.185.5.5,0,0,0,.083,0l4.114-.556a.626.626,0,0,0-.167-1.242l-3.3.445L2,15.648l5.013,5.013a.633.633,0,0,0,.44.185.613.613,0,0,0,.44-.185L20.335,8.222a4.793,4.793,0,0,0,0-6.787ZM13.789,2.964l2.089,2.089L4.523,16.408,2.434,14.319ZM7.456,19.336,5.413,17.293,16.768,5.938l2.043,2.043ZM19.682,7.087l-5-5a3.551,3.551,0,0,1,5,5Z"
        transform="translate(0 -0.028)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconEdit);
