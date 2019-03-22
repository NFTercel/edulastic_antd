/* eslint-disable react/prop-types */
import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconShare = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.696 17.45" {...props}>
    <g transform="translate(-25.5)">
      <g transform="translate(25.5)">
        <path
          d="M38.653 6.138a2.448 2.448 0 0 0-1.754.7l-6.226-3.6a1.492 1.492 0 0 0 .088-.614 2.631 2.631 0 0 0-5.261 0 2.584 2.584 0 0 0 2.631 2.631 2.448 2.448 0 0 0 1.754-.7l6.226 3.6a1.492 1.492 0 0 0-.088.614 1.492 1.492 0 0 0 .088.614l-6.226 3.683a2.448 2.448 0 0 0-1.754-.7 2.543 2.543 0 1 0 2.543 2.543 1.712 1.712 0 0 0-.088-.614l6.226-3.683a2.448 2.448 0 0 0 1.754.7A2.584 2.584 0 0 0 41.2 8.681a2.44 2.44 0 0 0-2.547-2.543z"
          transform="translate(-25.5)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconShare);
