/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconSearch = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.41 16.407" {...props}>
    <path
      d="M17.144 14.945L13.1 10.883a6.467 6.467 0 0 0 1.61-4.259A6.754 6.754 0 0 0 7.847 0 6.754 6.754 0 0 0 .984 6.625a6.754 6.754 0 0 0 6.863 6.625 6.959 6.959 0 0 0 3.932-1.2l4.076 4.092a.918.918 0 0 0 1.265.024.844.844 0 0 0 .024-1.221zM7.847 1.728a4.992 4.992 0 0 1 5.072 4.9 4.992 4.992 0 0 1-5.072 4.9 4.992 4.992 0 0 1-5.072-4.9 4.992 4.992 0 0 1 5.072-4.9z"
      transform="translate(-.984)"
    />
  </SVG>
);

export default withIconStyles(IconSearch);
