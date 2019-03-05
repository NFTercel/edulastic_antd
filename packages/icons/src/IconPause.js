/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconPause = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.168 23.729" {...props}>
    <g id="pause" transform="translate(-14.5)">
      <path
        id="Path_75"
        d="M14.579 0A1.08 1.08 0 0 0 13.5 1.079V22.65a1.079 1.079 0 0 0 2.157 0V1.079A1.08 1.08 0 0 0 14.579 0z"
        className="cls-1"
        data-name="Path 75"
        transform="translate(1)"
      />
      <path
        id="Path_76"
        d="M27.579 0A1.08 1.08 0 0 0 26.5 1.079V22.65a1.079 1.079 0 0 0 2.157 0V1.079A1.08 1.08 0 0 0 27.579 0z"
        className="cls-1"
        data-name="Path 76"
        transform="translate(-1.989)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconPause);
