import styled from 'styled-components';
import { Row } from 'antd';
import { mobileWidth } from '@edulastic/colors';

export const AdaptiveRow = styled(Row)`
   @media (max-width: ${mobileWidth}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .ant-col-12 {
      width: 100%
    }
  }
`;
