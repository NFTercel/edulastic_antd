/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconBookmark = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.362 13.43" {...props}>
    <g id="bookmark-white" transform="translate(-33.261)">
      <path
        id="Path_51"
        d="M44.45.444a1 1 0 0 0-.466-.364.983.983 0 0 0-.391-.08h-9.3a.982.982 0 0 0-.39.08 1 1 0 0 0-.466.364.942.942 0 0 0-.173.55v11.442a.943.943 0 0 0 .173.55 1 1 0 0 0 .466.364.982.982 0 0 0 .39.08 1.059 1.059 0 0 0 .737-.293l3.915-3.764 3.915 3.764a1.056 1.056 0 0 0 .737.284 1.033 1.033 0 0 0 .857-.435.941.941 0 0 0 .173-.55V.994a.942.942 0 0 0-.177-.55zm-.963 11.717l-3.755-3.6-.79-.754-.79.754-3.755 3.6V1.136h9.09v11.025z"
        className="cls-1"
        data-name="Path 51"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconBookmark);
