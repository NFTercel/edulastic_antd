/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconPin = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.242 26.043" {...props}>
    <path className="a" d="M27.742,6.621a6.621,6.621,0,1,0-7.062,6.6V25.6a.441.441,0,0,0,.883,0V13.22A6.624,6.624,0,0,0,27.742,6.621Zm-8.828,0A1.766,1.766,0,1,1,20.68,4.855,1.767,1.767,0,0,1,18.914,6.621Z" transform="translate(-14.5)" />
  </SVG>
);

export default withIconStyles(IconPin);
