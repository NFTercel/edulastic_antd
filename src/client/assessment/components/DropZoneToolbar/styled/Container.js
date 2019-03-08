import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";
import { mobileWidth } from "@edulastic/colors";

export const Container = styled(FlexContainer)`
  min-height: 67px;
  padding: 14px;
  background: ${props => props.theme.dropZoneToolbar.containerBgColor};
  margin-top: 20px;
  
  & > * {
    margin-right: 40px;
  }
  
  @media (max-width: ${mobileWidth}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & > * {
      margin-right: 0px;
    }
    
    & > div {
      margin: 5px 0;
    }
    
    div:last-child {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
