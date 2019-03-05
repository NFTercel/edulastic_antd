import React from 'react';
import withIconStyles from '@edulastic/icons/src/HOC/withIconStyles';
import SVG from '@edulastic/icons/src/common/SVG';

const IconGraphLine = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.462 24.462" {...props}>
    <path
      fill="none"
      strokeLinecap="round"
      strokeWidth="2"
      d="M293.3,486l-15.908,15.908"
      transform="translate(12.092 -558.218) rotate(30)"
    />
  </SVG>
);

export default withIconStyles(IconGraphLine);
