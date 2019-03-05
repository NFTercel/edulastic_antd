/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconLogout = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.909 23.909" {...props}>
    <g id="Group_43" data-name="Group 43">
      <g id="Group_42" data-name="Group 42">
        <path
          id="Path_73"
          d="M15.441 17.932h-1a.5.5 0 0 0-.5.5v3.487H1.992V1.992h11.955v3.487a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V1.992a1.992 1.992 0 0 0-2-1.992H1.992A1.992 1.992 0 0 0 0 1.992v19.925a1.992 1.992 0 0 0 1.992 1.992h11.955a1.992 1.992 0 0 0 1.992-1.992V18.43a.5.5 0 0 0-.498-.498z"
          className="cls-1"
          data-name="Path 73"
        />
        <path
          id="Path_74"
          d="M145.77 133.6l-5.977-5.479a.5.5 0 0 0-.835.367v1a.5.5 0 0 0 .165.37l3.463 3.117H128.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h14.088l-3.463 3.117a.5.5 0 0 0-.165.37v1a.5.5 0 0 0 .3.456.491.491 0 0 0 .2.042.5.5 0 0 0 .337-.131l5.977-5.479a.5.5 0 0 0 0-.735z"
          className="cls-1"
          data-name="Path 74"
          transform="translate(-122.023 -122.017)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconLogout);
