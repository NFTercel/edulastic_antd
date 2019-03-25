import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconId = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.406 15.321" {...props}>
    <g transform="translate(-0.001)">
      <path
        d="M15.406,5.746V3.83h-2.4L13.489,0H11.574L11.1,3.83H7.266L7.745,0H5.829L5.351,3.83H2V5.746H5.111l-.478,3.83H2v1.915H4.394l-.479,3.83H5.83l.479-3.83h3.83l-.48,3.83h1.916l.479-3.83h3.352V9.576H12.294l.477-3.83Zm-5.027,3.83H6.549l.478-3.83h3.829Z"
        transform="translate(-2)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconId);
