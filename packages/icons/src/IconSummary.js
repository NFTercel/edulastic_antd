/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconSummary = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.12 17.12" {...props}>
    <g transform="translate(0 -1.608)">
      <g transform="translate(0 1.608)">
        <g transform="translate(0 8.895)">
          <path
            d="M11.593,266H.669a.669.669,0,0,0-.669.669v5.551a2.009,2.009,0,0,0,2.006,2.006h9.586a.669.669,0,0,0,.669-.669v-6.888A.669.669,0,0,0,11.593,266Zm-.669,6.888H2.006a.67.67,0,0,1-.669-.669v-4.882h9.586Z"
            transform="translate(0 -266)"
          />
          <path
            d="M273.749,266H268.9a.669.669,0,0,0-.669.669v6.888a.669.669,0,0,0,.669.669h3.508a2.009,2.009,0,0,0,2.006-2.006v-5.551A.669.669,0,0,0,273.749,266Zm-.669,6.219a.67.67,0,0,1-.669.669h-2.839v-5.551h3.508Z"
            transform="translate(-257.297 -266)"
          />
        </g>
        <path
          d="M11.593,274.227H.669A.669.669,0,0,1,0,273.559v-5.552A2.009,2.009,0,0,1,2.006,266h9.586a.669.669,0,0,1,.669.669v6.89A.669.669,0,0,1,11.593,274.227Zm-.669-6.89H2.006a.67.67,0,0,0-.669.669v4.883h9.586Z"
          transform="translate(0 -266)"
        />
        <path
          d="M273.749,274.227H268.9a.669.669,0,0,1-.669-.669v-6.89A.669.669,0,0,1,268.9,266h3.508a2.009,2.009,0,0,1,2.006,2.007v5.552A.669.669,0,0,1,273.749,274.227Zm-.669-6.221a.67.67,0,0,0-.669-.669h-2.839v5.552h3.508Z"
          transform="translate(-257.297 -266)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconSummary);
