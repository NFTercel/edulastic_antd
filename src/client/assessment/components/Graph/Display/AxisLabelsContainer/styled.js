import styled from "styled-components";
import { white } from "@edulastic/colors";

export const GraphWrapper = styled.div`
  width: ${props => (props.width ? `${props.width}px` : "100%")};
  border-radius: 4px;
  border: ${props => (props.border ? 1 : 0)}px solid ${props => props.borderColor};
`;

export const JSXBox = styled.div`
  background-color: ${white};
  position: relative;
  overflow: hidden;

  border: 1px solid #e8e8e8;
  border-radius: 0;
  margin: ${props => (props.margin ? props.margin : 0)}px;
`;
