/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconBreakingLine = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.014 15.331" {...props}>
    <g transform="translate(0 0)">
      <path
        d="M-17618.969-14514.708l7.447-12.493,5.811,12.493,8.207-12.493"
        transform="translate(17620.607 14528.652)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <g transform="translate(7.262 0)" fill="#fff" stroke="#fff" strokeWidth="1">
        <circle cx="2.017" cy="2.017" r="2.017" stroke="none" />
        <circle cx="2.017" cy="2.017" r="1.517" fill="none" />
      </g>
      <g transform="translate(0 11.296)" fill="#fff" stroke="#fff" strokeWidth="1">
        <circle cx="2.017" cy="2.017" r="2.017" stroke="none" />
        <circle cx="2.017" cy="2.017" r="1.517" fill="none" />
      </g>
      <g transform="translate(20.979 0)" fill="#fff" stroke="#fff" strokeWidth="1">
        <circle cx="2.017" cy="2.017" r="2.017" stroke="none" />
        <circle cx="2.017" cy="2.017" r="1.517" fill="none" />
      </g>
      <g transform="translate(13.717 11.296)" fill="#fff" stroke="#fff" strokeWidth="1">
        <circle cx="2.017" cy="2.017" r="2.017" stroke="none" />
        <circle cx="2.017" cy="2.017" r="1.517" fill="none" />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconBreakingLine);
