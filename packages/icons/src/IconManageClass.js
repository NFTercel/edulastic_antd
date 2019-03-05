/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconManage = props => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 66.127 80.332"
    {...props}
  >
    <g id="symbol">
      <circle
        id="Ellipse_6"
        cx="2.841"
        cy="2.841"
        r="2.841"
        class="cls-1"
        data-name="Ellipse 6"
        transform="translate(22.411 22.095)"
      />
      <circle
        id="Ellipse_7"
        cx="2.841"
        cy="2.841"
        r="2.841"
        class="cls-1"
        data-name="Ellipse 7"
        transform="translate(36.615 22.095)"
      />
      <path
        id="Path_72"
        d="M66.127 37.4a32.906 32.906 0 0 0-52.712-26.352V6a3.254 3.254 0 0 0 1.736-2.841 3.156 3.156 0 1 0-6.313 0 3.055 3.055 0 0 0 1.578 2.683v7.575h.158A32.334 32.334 0 0 0 0 37.4a29.83 29.83 0 0 0 1.578 9.943C8.365 75.6 43.717 80.331 43.717 80.331V68.81a33.172 33.172 0 0 0 22.41-31.41zM8.68 33.3a24.672 24.672 0 0 1 48.925 0z"
        class="cls-1"
        data-name="Path 72"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconManage);
