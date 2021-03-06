/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconManage = props => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22.231 25.022"
    {...props}
  >
    <defs>{/* <style>.a{fill:#434b5d;}</style> */}</defs>
    <g transform="translate(0)">
      <path
        className="a"
        d="M23.829,13.967a.7.7,0,0,0-.619.706v.695h-.347a2.1,2.1,0,0,0-2.084,2.084V18.3a3.81,3.81,0,0,0-.532,7.143A3.818,3.818,0,0,0,18,28.915v9.379a.7.7,0,0,0,.695.695h6.253a.7.7,0,0,0,.695-.695V30.837c.63-.173,4.142-1.141,5.764-1.6a2.972,2.972,0,0,0,1.248-.64l.011-.011,5.482-.022a2.1,2.1,0,0,0,2.084-2.084V17.452a2.1,2.1,0,0,0-2.084-2.084H37.8v-.695a.695.695,0,1,0-1.389,0v.695H24.6v-.695a.695.695,0,0,0-.706-.706Q23.862,13.966,23.829,13.967Zm-.966,2.79H38.147a.679.679,0,0,1,.695.695v9.032a.678.678,0,0,1-.695.695l-4.863.022c0-.007,0-.014,0-.022A2.1,2.1,0,0,0,31.2,25.094H24a3.81,3.81,0,0,0-1.835-6.926v-.716A.679.679,0,0,1,22.863,16.757Zm-1.042,2.779a2.432,2.432,0,1,1-2.432,2.432A2.421,2.421,0,0,1,21.821,19.536ZM34.609,24.4a.7.7,0,1,0,.065,1.389h2.084a.695.695,0,1,0,0-1.39H34.674Q34.641,24.4,34.609,24.4ZM21.821,26.484H31.2a.684.684,0,0,1,.695.695.428.428,0,0,1-.174.391,1.756,1.756,0,0,1-.684.337h-.011c-1.754.491-6.264,1.726-6.264,1.726a.7.7,0,0,0-.51.673V37.6H19.389V28.915A2.411,2.411,0,0,1,21.821,26.484Z"
        transform="translate(-18 -13.967)"
      />
      <path
        className="a"
        d="M-4979.3-331.379h0v0c.08-.03.295-.22.579-1.37a.044.044,0,0,0,0-.011l4.864-.028a.68.68,0,0,0,.694-.694v-9.03a.679.679,0,0,0-.694-.694h-15.286a.679.679,0,0,0-.694.694V-342c-.052,0-.106,0-.168,0a3.992,3.992,0,0,0-1.222.19v-.7a2.087,2.087,0,0,1,2.084-2.086h.347v-.694a.691.691,0,0,1,.619-.706h.079a.693.693,0,0,1,.489.2.7.7,0,0,1,.2.5v.694h11.81v-.694a.7.7,0,0,1,.683-.706h.014a.7.7,0,0,1,.491.2.7.7,0,0,1,.2.5v.694h.347a2.087,2.087,0,0,1,2.083,2.086v9.03a2.091,2.091,0,0,1-2.083,2.084Zm1.937-2.8a.7.7,0,0,1-.7-.664.7.7,0,0,1,.663-.727h2.148a.7.7,0,0,1,.694.694.7.7,0,0,1-.694.7h-2.116Z"
        transform="translate(4994 346.001)"
      />
    </g>
  </SVG>
);

export default withIconStyles(IconManage);
