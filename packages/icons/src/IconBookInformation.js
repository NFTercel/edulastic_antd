/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconBookInformation = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.965 20.496" {...props}>
    <g transform="translate(-31.658 0.125)">
      <g transform="translate(31.783)">
        <path
          className="a"
          d="M48.892,0H34.973a3.186,3.186,0,0,0-3.185,3.143l-.005-.006V17.056a3.191,3.191,0,0,0,3.19,3.19H45.729a1.243,1.243,0,0,0,1.239-1.265V5.694a.611.611,0,0,0-.606-.633H34.973A1.882,1.882,0,0,1,33.048,3.19a1.926,1.926,0,0,1,1.925-1.925h13.26V15.817a.657.657,0,0,0,.659.633.612.612,0,0,0,.606-.633V.633A.611.611,0,0,0,48.892,0ZM34.973,6.327H45.7l.027,12.654H34.974a1.927,1.927,0,0,1-1.926-1.925V5.708A3.237,3.237,0,0,0,34.973,6.327Z"
          transform="translate(-31.783)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconBookInformation);
