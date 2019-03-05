import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";

export const Container = styled(FlexContainer)`
  min-height: 67px;
  width: ${({ width }) => width || "100%"};
  padding: 14px 28px 14px 14px;
  background: ${props => props.theme.widgets.highlightImage.containerBgColor};
  margin-top: 20px;
  border-bottom: 1px solid ${props => props.theme.widgets.highlightImage.containerBorderColor};
`;
