/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconLayout = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.441 15.209" {...props}>
    <g id="light-bulb" transform="translate(-15.568 -14.396)">
      <g id="Group_30" data-name="Group 30" transform="translate(15.823 14.646)">
        <path
          id="Path_52"
          d="M123.47 92.3a4.922 4.922 0 0 0-4.905 4.128 4.767 4.767 0 0 0 1.227 3.865 4.891 4.891 0 0 1 1.3 3.34v1.951a1.44 1.44 0 0 0 1.458 1.425h1.879a1.44 1.44 0 0 0 1.458-1.425v-1.951a4.608 4.608 0 0 1 1.227-3.264 4.637 4.637 0 0 0 1.342-3.264 4.914 4.914 0 0 0-4.986-4.805zm1.684 13.284a.681.681 0 0 1-.691.677h-1.879a.679.679 0 0 1-.691-.677v-.864h3.257v.864zm1.425-5.74a5.338 5.338 0 0 0-1.458 3.79v.338h-3.257v-.338a5.771 5.771 0 0 0-1.533-3.826 3.961 3.961 0 0 1-1.036-3.264 4.23 4.23 0 0 1 4.178-3.491 4.147 4.147 0 0 1 4.218 4.052 3.922 3.922 0 0 1-1.112 2.738z"
          className="cls-1"
          data-name="Path 52"
          transform="translate(-118.522 -92.3)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconLayout);
