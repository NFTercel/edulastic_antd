import styled from "styled-components";
import { IconCheck as Icon } from "@edulastic/icons";

export const IconCheck = styled(Icon)`
  width: 16px;
  height: 16px;
  fill: ${props => props.theme.widgets.mathFormula.iconCheckColor}
  :hover {
    fill: ${props => props.theme.widgets.mathFormula.iconCheckColor}
  }
`;
