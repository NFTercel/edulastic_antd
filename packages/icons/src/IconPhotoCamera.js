/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconPhotoCamera = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.519 15.842" {...props}>
    <g transform="translate(0 -46.15)">
      <g transform="translate(0 46.15)">
        <path
          d="M0,51V59.61a2.383,2.383,0,0,0,2.382,2.382H17.137a2.383,2.383,0,0,0,2.382-2.382V51a2.268,2.268,0,0,0-2.267-2.267H14.082l-.076-.331A2.9,2.9,0,0,0,11.17,46.15H8.345A2.9,2.9,0,0,0,5.509,48.4l-.076.331H2.267A2.27,2.27,0,0,0,0,51Zm5.824-1.291a.485.485,0,0,0,.474-.378l.163-.709a1.927,1.927,0,0,1,1.884-1.494H11.17a1.927,1.927,0,0,1,1.884,1.494l.163.709a.49.49,0,0,0,.474.378h3.557A1.29,1.29,0,0,1,18.539,51V59.61a1.406,1.406,0,0,1-1.406,1.406H2.382A1.406,1.406,0,0,1,.976,59.61V51a1.29,1.29,0,0,1,1.291-1.291H5.824Z"
          transform="translate(0 -46.15)"
        />
        <circle className="a" cx="0.653" cy="0.653" r="0.653" transform="translate(2.649 4.987)" />
        <path
          d="M146.2,183.348a4.1,4.1,0,1,0-4.1-4.1A4.106,4.106,0,0,0,146.2,183.348Zm0-7.222a3.123,3.123,0,1,1-3.123,3.123A3.128,3.128,0,0,1,146.2,176.126Z"
          transform="translate(-136.439 -170.011)"
        />
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconPhotoCamera);
