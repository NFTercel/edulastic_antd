import styled from 'styled-components';
import { mobileWidth } from '@edulastic/colors';

export const AdaptiveButtonList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;

  & > * {
    margin-right: 45px;
  }
  & > *:last-child {
    margin-right: 0;
  }
  
  @media (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    & > * {
      margin-right: 0px;
    }
  }
`;
