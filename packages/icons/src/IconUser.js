import React from "react";
import withIconStyles from "./HOC/withIconStyles";
import SVG from "./common/SVG";

const IconUser = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.174 16.005" {...props}>
    <g transform="translate(-0.001)">
      <path
        d="M107.757,7.827c1.779,0,3.222-1.752,3.222-3.914S110.506,0,107.757,0s-3.222,1.752-3.222,3.914S105.978,7.827,107.757,7.827Z"
        transform="translate(-101.671)"
      />
      <path d="M41.9,300.44c0-.132,0-.037,0,0Z" transform="translate(-41.895 -286.637)" />
      <path d="M308.085,301.606c0-.036,0-.25,0,0Z" transform="translate(-295.913 -287.7)" />
      <path
        d="M54.073,183.257c-.06-3.765-.551-4.838-4.315-5.517a2.644,2.644,0,0,1-3.529,0c-3.722.672-4.244,1.729-4.312,5.4-.006.3-.008.315-.009.28,0,.065,0,.186,0,.4,0,0,.9,1.806,6.085,1.806s6.085-1.806,6.085-1.806c0-.135,0-.229,0-.293A2.421,2.421,0,0,1,54.073,183.257Z"
        transform="translate(-41.907 -169.612)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconUser);
