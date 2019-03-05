import React from 'react';
import withIconStyles from '@edulastic/icons/src/HOC/withIconStyles';
import SVG from '@edulastic/icons/src/common/SVG';

const IconGraphLabel = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.509 14.374" {...props}>
    <g transform="translate(0.375 -74.7)">
      <path d="M19.325,80.731l-3.369-4.6a2.833,2.833,0,0,0-2.09-1.061H1.581A1.584,1.584,0,0,0,0,76.656V87.118A1.584,1.584,0,0,0,1.581,88.7H13.866a2.819,2.819,0,0,0,2.09-1.061l3.369-4.6A2.049,2.049,0,0,0,19.325,80.731Zm-.88,1.674L15.077,87a1.769,1.769,0,0,1-1.214.613H1.581a.494.494,0,0,1-.492-.492V76.656a.494.494,0,0,1,.492-.492H13.866a1.794,1.794,0,0,1,1.214.613l3.369,4.6A.982.982,0,0,1,18.445,82.406Z" />
    </g>
  </SVG>
);

export default withIconStyles(IconGraphLabel);
