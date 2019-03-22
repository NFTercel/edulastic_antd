import styled from "styled-components";
import { Button } from "antd";

export const StyledDiv = styled.div`
  width: ${props => (props.wide ? "50%" : "25%")}
  height: 100%;
  justify-content: center;
  flex: 1 0 auto;
  padding-right: 1px;
  &:last-child {
    padding-right: 0;
  }
`;

export const StyledButton = styled(Button)`
  width:100%;
  height: 100%;
  background-color: ${props => (props.orange ? "#f5923e" : "#e0e0e0")}  
  border: 0;
  font-size: 1.5rem;  
  flex: 1 0 auto;
  padding: 0;
  border-radius: 0;
  color: ${props => (props.orange ? "#fff" : "#000")}  
`;
