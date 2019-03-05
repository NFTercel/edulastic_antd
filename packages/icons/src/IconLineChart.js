/* eslint-disable react/prop-types */
import React from 'react';
import withIconStyles from './HOC/withIconStyles';
import SVG from './common/SVG';

const IconLineChart = props => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.892 14.64" {...props}>
    <g transform="translate(0 0)">
      <g transform="translate(0 0)">
        <path
          className="a"
          d="M27.612,134.68a3.277,3.277,0,0,0-2.747,5.069l-3.544,3.544a3.271,3.271,0,0,0-3.634.037l-3.58-3.581a3.28,3.28,0,1,0-5.495,0l-3.544,3.544a3.285,3.285,0,1,0,.959.959l3.544-3.544a3.269,3.269,0,0,0,3.578,0l3.6,3.6a3.28,3.28,0,1,0,5.531-.056l3.544-3.544a3.279,3.279,0,1,0,1.788-6.027ZM3.28,147.964A1.924,1.924,0,1,1,5.2,146.04,1.926,1.926,0,0,1,3.28,147.964Zm8.08-8.08a1.924,1.924,0,1,1,1.924-1.924A1.926,1.926,0,0,1,11.36,139.884Zm8.172,8.08a1.924,1.924,0,1,1,1.924-1.924A1.926,1.926,0,0,1,19.532,147.964Zm8.08-8.08a1.924,1.924,0,1,1,1.924-1.924A1.926,1.926,0,0,1,27.612,139.884Z"
          transform="translate(0 -134.68)"
        />
      </g>
      <g transform="translate(8.13 8.13)">
        <g transform="translate(0 0)">
          <path
            className="a"
            d="M137.277,269.625a.678.678,0,0,0-.959,0L134.939,271a.678.678,0,1,0,.959.959l1.379-1.379A.678.678,0,0,0,137.277,269.625Z"
            transform="translate(-134.741 -269.427)"
          />
        </g>
      </g>
      <g transform="translate(20.027 3.799)">
        <g transform="translate(0 0)">
          <path
            className="a"
            d="M334.464,197.847a.678.678,0,0,0-.959,0l-1.379,1.379a.678.678,0,1,0,.959.959l1.379-1.379A.678.678,0,0,0,334.464,197.847Z"
            transform="translate(-331.928 -197.649)"
          />
        </g>
      </g>
    </g>
  </SVG>
);

export default withIconStyles(IconLineChart);
