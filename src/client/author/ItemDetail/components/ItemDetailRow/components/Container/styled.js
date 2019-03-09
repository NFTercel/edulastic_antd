import { FlexContainer, Paper } from '@edulastic/common';
import { darkBlueSecondary, mobileWidth } from '@edulastic/colors';
import styled from 'styled-components';

export const Content = styled(Paper)`
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  overflow: auto;
  padding-left: 40px;
  padding-top: 20px;
  height: 100%;

  @media (max-width: ${mobileWidth}) {
    padding-left: 10px;
    margin-right: ${props => !props.value && '20px !important'};
    margin-left: ${props => props.value && '20px !important'};
  }
`;

export const TabContainer = styled.div`
  margin-bottom: 30px;
`;

export const AddButtonContainer = styled(FlexContainer)`
  margin-bottom: 30px;
  margin-right: 40px;

  @media (max-width: ${mobileWidth}) {
    margin-right: 0px;
  }
`;

export const MobileSide = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 220px);
  right: ${props => (props.type === 'right' ? '0' : 'unset')}
  left: ${props => (props.type === 'left' ? '0' : 'unset')}
  background: ${darkBlueSecondary};
  width: 25px;
  bottom: 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
