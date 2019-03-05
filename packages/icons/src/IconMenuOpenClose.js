/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconMenuOpenClose = props => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17.406 14.505"
    {...props}
  >
    <defs>{/* <style>
            .cls-1{fill:#fff}
        </style> */}
    </defs>
    <g id="menu-open-close" transform="translate(-222.297 -43.748)">
      <g
        id="menu_1_"
        data-name="menu (1)"
        transform="translate(222.297 41.748)"
      >
        <path
          id="Path_5"
          d="M17.406 2.725A.685.685 0 0 0 16.681 2H.725A.685.685 0 0 0 0 2.725v1.45a.685.685 0 0 0 .725.725h15.956a.685.685 0 0 0 .725-.725z"
          className="cls-1"
          data-name="Path 5"
        />
        <path
          id="Path_6"
          d="M17.406 10.725a.685.685 0 0 0-.725-.725H.725a.685.685 0 0 0-.725.725v1.45a.685.685 0 0 0 .725.725h15.956a.685.685 0 0 0 .725-.725z"
          className="cls-1"
          data-name="Path 6"
          transform="translate(0 -2.198)"
        />
        <path
          id="Path_7"
          d="M17.406 18.725a.685.685 0 0 0-.725-.725H.725a.685.685 0 0 0-.725.725v1.45a.685.685 0 0 0 .725.725h15.956a.685.685 0 0 0 .725-.725z"
          className="cls-1"
          data-name="Path 7"
          transform="translate(0 -4.396)"
        />
      </g>
    </g>
  </SVG>
);
export default withIconStyles(IconMenuOpenClose);
