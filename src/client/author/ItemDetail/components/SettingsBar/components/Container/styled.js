import { greenDark, white, mobileWidth } from '@edulastic/colors';
import { FlexContainer } from '@edulastic/common';
import styled from 'styled-components';

export const Content = styled.div`
  width: 25vw;
  background: ${white};
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  padding: 30px;
  box-shadow: -3px 3px 6px 0 rgba(0, 0, 0, 0.16);
  overflow-y: auto;
  
   @media (max-width: ${mobileWidth}) {
    width: 100%
  }
`;

export const SettingsButtonWrapper = styled(FlexContainer)`
  margin-bottom: 25px;
`;

export const Heading = styled.div`
  color: ${greenDark};
  margin-bottom: 25px;
  font-size: 16px;
  font-weight: 600;
`;

export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Checkboxes = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;
