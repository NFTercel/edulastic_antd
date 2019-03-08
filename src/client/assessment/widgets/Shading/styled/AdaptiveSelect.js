import { mobileWidth } from '@edulastic/colors';
import { Select } from 'antd';
import styled from 'styled-components';

export const AdaptiveSelect = styled(Select)`
  margin-top: 40px
  width: 320
  
  @media (max-width: ${mobileWidth}) {
    width: 100%
  }
`;
