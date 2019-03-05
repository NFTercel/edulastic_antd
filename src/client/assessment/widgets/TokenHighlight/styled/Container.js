import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";

export const Container = styled(FlexContainer)`
  background: ${props => props.theme.widgets.tokenHighlight.containerBgColor};
  padding: 15px;
  margin-bottom: 20px;
`;
