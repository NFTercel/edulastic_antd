/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconReport = props => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22.428 22.433"
    {...props}
  >
    <defs>{/* <style>.a{fill:#434b5d;}</style> */}</defs>
    <g transform="translate(-0.05)">
      <g transform="translate(0.05)">
        <path
          className="a"
          d="M19.44,60.477H10.7V51.736a.633.633,0,0,0-.636-.636A10.013,10.013,0,1,0,20.076,61.113.639.639,0,0,0,19.44,60.477Zm-9.377,9.377A8.741,8.741,0,0,1,9.427,52.4v8.718a.633.633,0,0,0,.636.636h8.718A8.75,8.75,0,0,1,10.063,69.854Z"
          transform="translate(-0.05 -48.693)"
        />
        <path
          className="a"
          d="M260.8,9.98A10.011,10.011,0,0,0,250.786,0a.633.633,0,0,0-.636.636v9.377a.633.633,0,0,0,.636.636h9.377a.633.633,0,0,0,.636-.636Zm-9.377-.6V1.3A8.747,8.747,0,0,1,259.5,9.382h-8.082Z"
          transform="translate(-238.371)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconReport);
