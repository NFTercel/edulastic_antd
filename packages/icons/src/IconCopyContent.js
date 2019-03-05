/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconCopyContent = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.842 19.461" {...props}>
    <g transform="translate(-38.125 0.125)">
      <g transform="translate(38.25)">
        <path
          className="a"
          d="M50.475,0H40A1.752,1.752,0,0,0,38.25,1.746V13.971H40V1.746H50.475Zm2.62,3.493H43.489a1.752,1.752,0,0,0-1.746,1.746V17.464a1.752,1.752,0,0,0,1.746,1.746h9.605a1.752,1.752,0,0,0,1.746-1.746V5.239A1.752,1.752,0,0,0,53.094,3.493Zm0,13.971H43.489V5.239h9.605Z"
          transform="translate(-38.25)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconCopyContent);
