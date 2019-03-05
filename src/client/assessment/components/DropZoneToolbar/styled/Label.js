import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";

export const Label = styled(FlexContainer)`
  font-weight: ${props => props.theme.dropZoneToolbar.labelFontWeight};
  font-size: ${props => props.theme.dropZoneToolbar.labelFontSize};
`;
