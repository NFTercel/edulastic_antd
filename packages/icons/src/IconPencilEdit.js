/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconPencilEdit = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.078 16" {...props}>
    <g transform="translate(0 -1.289)">
      <path d="M10 3.959l3.269 3.271-8.279 8.279-3.269-3.271zm5.752-.789l-1.46-1.458a1.447 1.447 0 0 0-2.045 0l-1.4 1.4 3.271 3.271 1.63-1.63a1.115 1.115 0 0 0 .003-1.583zM.01 16.835a.372.372 0 0 0 .45.443l3.64-.884-3.264-3.27z" />
    </g>
  </SVG>
);

export default withIconStyles(IconPencilEdit);
