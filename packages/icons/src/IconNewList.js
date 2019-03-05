/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconNewList = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.921 20.926" {...props}>
    <g transform="translate(0)">
      <path
        className="a"
        d="M7.175,0H.94A.9.9,0,0,0,.05.89V7.168a.9.9,0,0,0,.89.89H7.175a.918.918,0,0,0,.89-.847V.89A.9.9,0,0,0,7.175,0Zm-.89,6.32h-4.5V1.737h4.5Z"
        transform="translate(-0.05 0)"
      />
      <path
        className="a"
        d="M253.74,21.58h8.323a.89.89,0,0,0,0-1.78H253.74a.89.89,0,0,0,0,1.78Z"
        transform="translate(-242.032 -18.953)"
      />
      <path
        className="a"
        d="M262.067,125.9H253.74a.89.89,0,0,0,0,1.78h8.323a.89.89,0,0,0,0-1.78Z"
        transform="translate(-242.032 -120.512)"
      />
      <path
        className="a"
        d="M7.175,300.7H.94a.9.9,0,0,0-.89.89v6.278a.9.9,0,0,0,.89.89H7.175a.918.918,0,0,0,.89-.847v-6.32A.892.892,0,0,0,7.175,300.7Zm-.89,6.32h-4.5v-4.583h4.5Z"
        transform="translate(-0.05 -287.832)"
      />
      <path
        className="a"
        d="M262.067,320.4H253.74a.89.89,0,1,0,0,1.78h8.323a.89.89,0,0,0,0-1.78Z"
        transform="translate(-242.032 -306.689)"
      />
      <path
        className="a"
        d="M262.067,426.6H253.74a.89.89,0,0,0,0,1.78h8.323a.9.9,0,0,0,.89-.89A.886.886,0,0,0,262.067,426.6Z"
        transform="translate(-242.032 -408.345)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconNewList);
