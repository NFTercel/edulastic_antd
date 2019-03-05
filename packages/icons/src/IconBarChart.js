/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconBarChart = props => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.918 21.126"
    {...props}
  >
    <defs>{/* <style>.a{fill:#434b5d;}</style> */}</defs>
    <g transform="translate(0)">
      <g transform="translate(0 6.906)">
        <g transform="translate(0 0)">
          <path
            className="a"
            d="M156.7,150h-6.026a.679.679,0,0,0-.677.677v12.865a.679.679,0,0,0,.677.677H156.7a.679.679,0,0,0,.677-.677V150.677A.679.679,0,0,0,156.7,150Zm-.745,12.865h-4.6V151.354h4.6Z"
            transform="translate(-150 -150)"
          />
        </g>
      </g>
      <g transform="translate(8.248 0)">
        <g transform="translate(0 0)">
          <path
            className="a"
            d="M305.7,48h-6.026a.679.679,0,0,0-.677.677V68.449a.679.679,0,0,0,.677.677H305.7a.679.679,0,0,0,.677-.677V48.677A.679.679,0,0,0,305.7,48Zm-.677,19.771h-4.672V49.354h4.672Z"
            transform="translate(-299 -48)"
          />
        </g>
      </g>
      <g transform="translate(16.537 11.646)">
        <g transform="translate(0 0)">
          <path
            className="a"
            d="M6.7,220H.677a.679.679,0,0,0-.677.677V228.8a.679.679,0,0,0,.677.677H6.7a.679.679,0,0,0,.677-.677v-8.125A.679.679,0,0,0,6.7,220Zm-.677,8.125H1.354v-6.771H6.026Z"
            transform="translate(0 -220)"
          />
        </g>
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconBarChart);
