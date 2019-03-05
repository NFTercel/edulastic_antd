/* eslint-disable react/prop-types */
import React from 'react'
import withIconStyles from './HOC/withIconStyles'
import SVG from './common/SVG'

const IconBothNotIncludedSegment = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 14" {...props}>
    <g transform="translate(-394.76 -1485)">
      <g transform="translate(394.76 1485)" fill="none" stroke-width="2">
        <circle cx="7" cy="7" r="7" stroke="none"/>
        <circle cx="7" cy="7" r="6" fill="none"/>
      </g>
      <g transform="translate(440.76 1485)" fill="none" stroke-width="2">
        <circle cx="7" cy="7" r="7" stroke="none"/>
        <circle cx="7" cy="7" r="6" fill="none"/>
      </g>
      <line x2="33" transform="translate(408.26 1492.5)" stroke-width="2"/>
    </g>
  </SVG>
)

export default withIconStyles(IconBothNotIncludedSegment)