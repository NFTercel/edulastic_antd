/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconLogoCompact = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" {...props}>
    <path d="M0 0h13.641v4.657H4.723v4.522h8.918v4.573H4.723v6.578h8.918v4.676H0V0zm23.475 10.096a1.885 1.885 0 0 1 1.387.578c.375.366.583.87.575 1.394a1.889 1.889 0 0 1-.575 1.377 1.888 1.888 0 0 1-1.387.578 1.87 1.87 0 0 1-1.371-.578 1.889 1.889 0 0 1-.575-1.377c-.008-.524.2-1.028.575-1.394a1.867 1.867 0 0 1 1.371-.578z" />
  </SVG>
);
export default withIconStyles(IconLogoCompact);
