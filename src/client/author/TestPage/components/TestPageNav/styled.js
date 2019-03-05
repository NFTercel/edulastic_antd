import styled from "styled-components";
import { white, desktopWidth } from "@edulastic/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px
  overflow-y: hidden;
  overflow-x: scroll;
  width: 100%;
  
  justify-content: center;
  
  @media screen and (min-width: ${desktopWidth}) {
    height: 60px
    overflow-y: unset;
    overflow-x: unset;
    width: 70%;
  }
`;

export const Link = styled.div`
  cursor: pointer;
  width: 102px;
  color: ${white};
  padding: 0 15px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  border: none;
  box-shadow: none;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 0;
  background: #0288d1;
  background: ${props => (props.active === "true" ? "#057fc1" : "transparent")};
  border-bottom: ${props => (props.active === "true" ? "4px solid #c9c9c9" : "none")};
  white-space: nowrap;

  :hover {
    border-bottom: 4px solid #c9c9c9;
  }
  :first-child {
    margin-left: 120px;
  }
  
  @media screen and (min-width: ${desktopWidth}) {
    margin: 0 7px;
    width: 136px;
    height: 45px;
    border-radius: 37px;
    background: ${props => (props.active === "true" ? "#f3f3f3" : "#0e93dc")};
    color: ${props => (props.active === "true" ? "#434b5d" : "#e5e5e5")};
    border-bottom: none;
    
    svg {
      fill: ${props => (props.active === "true" ? "#434b5d" : white)}
    }
      
    :hover {
      border-bottom: none;
      
       svg {
        fill: ${props => (props.active === "true" ? "#434b5d" : white)}
      }
    }
    
    :first-child {
      margin-left: 0;
    }
`;
