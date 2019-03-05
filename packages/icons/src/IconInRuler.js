/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconInRuler = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.759 21.759" {...props}>
    <path
      id="in-ruler"
      d="M21.122 3.485L18.275.639a2.187 2.187 0 0 0-3.089 0L.64 15.185a2.187 2.187 0 0 0 0 3.089l2.847 2.846a2.186 2.186 0 0 0 3.089 0L21.122 6.574a2.187 2.187 0 0 0 0-3.089zM4.388 20.219l-2.846-2.847a.91.91 0 0 1 0-1.286L16.088 1.54a.91.91 0 0 1 1.286 0l2.847 2.847a.911.911 0 0 1 0 1.286l-.254.254-.93-.927a.637.637 0 0 0-.9.9l.93.93-1.258 1.255-2.067-2.066a.637.637 0 0 0-.9.9l2.067 2.067-1.289 1.288-.93-.93a.637.637 0 1 0-.9.9l.93.93-1.31 1.31-2.069-2.064a.637.637 0 0 0-.9.9l2.067 2.067-1.288 1.288-.93-.93a.637.637 0 0 0-.9.9l.93.93-1.279 1.278-2.067-2.066a.637.637 0 1 0-.9.9l2.066 2.068-1.288 1.287-.93-.93a.637.637 0 0 0-.9.9l.93.93-.276.276a.911.911 0 0 1-1.286 0zm0 0"
      className="cls-1"
      transform="translate(-.001)"
    />
  </SVG>
);

export default withIconStyles(IconInRuler);
