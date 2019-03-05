import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { green, white, greenDark } from '@edulastic/colors';

const EduButton = ({ children, ...restProps }) => (
  <StyledButton {...restProps}>{children}</StyledButton>
);

export default EduButton;

const StyledButton = styled(Button)`
  ${(props) => {
    let style = {
      fontWeight: 600,
      fontSize: '11px',
      textTransform: 'uppercase',
    };
    if (props.type === 'secondary') {
      style = {
        ...style,
        ...{
          background: green,
          color: white,
          border: 'none',
          ':hover, :focus': {
            background: greenDark,
            color: white,
          },
        },
      };
    }

    return style;
  }};
`;
