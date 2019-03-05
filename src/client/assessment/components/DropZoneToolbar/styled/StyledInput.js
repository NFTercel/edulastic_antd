import styled from "styled-components";
import { Input } from "antd";

export const StyledInput = styled(Input)`
  text-align: ${({ textAlign }) => textAlign || "center"};
  width: ${({ width }) => width || 110}px;
  padding-right: 0;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  font-weight: ${props => props.theme.dropZoneToolbar.inputFontWeight};
`;
