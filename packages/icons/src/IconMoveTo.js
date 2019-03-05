/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconMoveTo = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.406 11.761" {...props}>
    <g transform="translate(-698.783 727.5)">
      <g transform="translate(703.115 -725.334)">
        <path
          d="M53.394,6.4,50.975,9.545a.128.128,0,0,1-.2,0L48.353,6.4a.127.127,0,0,1-.027-.078A.128.128,0,0,1,48.5,6.2l1.6.633V.128A.128.128,0,0,1,50.231,0h1.284a.128.128,0,0,1,.128.128V6.834l1.6-.633C53.3,6.181,53.429,6.353,53.394,6.4Z"
          transform="translate(-48.326)"
        />
      </g>
      <g transform="translate(703.857 -717.904) rotate(180)">
        <path d="M5.068,6.4,2.649,9.545a.128.128,0,0,1-.2,0L.027,6.4A.127.127,0,0,1,0,6.321a.13.13,0,0,1,.026-.077A.129.129,0,0,1,.176,6.2l1.6.633V.128A.128.128,0,0,1,1.905,0H3.189a.128.128,0,0,1,.128.128V6.834l1.6-.633C4.973,6.181,5.1,6.353,5.068,6.4Z" />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconMoveTo);
