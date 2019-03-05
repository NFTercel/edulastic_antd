/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconLayout = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.933 20.933" {...props}>
    <g transform="translate(0 0)">
      <path
        className="a"
        d="M7.139,15.858h7.981a.731.731,0,0,0,.739-.739V7.139a.731.731,0,0,0-.739-.739H7.139a.731.731,0,0,0-.739.739v7.981A.754.754,0,0,0,7.139,15.858Zm.739-7.981h6.5v6.5h-6.5v-6.5Z"
        transform="translate(-6.4 -6.4)"
      />
      <path
        className="a"
        d="M79.558,7.139a.731.731,0,0,0-.739-.739H70.839a.731.731,0,0,0-.739.739v7.981a.731.731,0,0,0,.739.739h7.981a.731.731,0,0,0,.739-.739Zm-1.477,7.242h-6.5v-6.5h6.5Z"
        transform="translate(-58.625 -6.4)"
      />
      <path
        className="a"
        d="M7.139,79.558h7.981a.731.731,0,0,0,.739-.739V70.839a.731.731,0,0,0-.739-.739H7.139a.731.731,0,0,0-.739.739v7.981A.754.754,0,0,0,7.139,79.558Zm.739-7.981h6.5v6.5h-6.5v-6.5Z"
        transform="translate(-6.4 -58.625)"
      />
      <path
        className="a"
        d="M78.819,70.1H70.839a.731.731,0,0,0-.739.739v7.981a.731.731,0,0,0,.739.739h7.981a.731.731,0,0,0,.739-.739V70.839A.754.754,0,0,0,78.819,70.1Zm-.739,7.981h-6.5v-6.5h6.5Z"
        transform="translate(-58.625 -58.625)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconLayout);
