import styled from 'styled-components';
import { Checkbox } from 'antd';
import { mobileWidth } from '@edulastic/colors';

export const AdaptiveCheckbox = styled(Checkbox)`
   @media (max-width: ${mobileWidth}) {
    margin: 0px
  }
`;
