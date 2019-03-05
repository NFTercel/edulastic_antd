/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconTarget = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.177 23.176" {...props}>
    <path
      className="a"
      d="M23.176,10.864h-2.21a9.415,9.415,0,0,0-8.654-8.654V0H10.863v2.21a9.415,9.415,0,0,0-8.654,8.654H0v1.449h2.21a9.415,9.415,0,0,0,8.654,8.654v2.21h1.449v-2.21a9.415,9.415,0,0,0,8.654-8.654h2.21ZM12.312,19.518V17.382H10.863v2.136a7.974,7.974,0,0,1-7.206-7.206H5.793V10.864H3.657a7.974,7.974,0,0,1,7.206-7.206V5.794h1.449V3.658a7.974,7.974,0,0,1,7.206,7.206H17.382v1.449h2.136A7.974,7.974,0,0,1,12.312,19.518Zm0,0"
      transform="translate(0.001 0)"
    />
  </SVG>
);

export default withIconStyles(IconTarget);
