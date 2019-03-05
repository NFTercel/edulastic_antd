import styled from "styled-components";
import { IconCheck as Icon } from "@edulastic/icons";

export const IconCheck = styled(Icon)`
  width: 12px;
  height: 10px;
  fill: ${props => props.theme.widgets.matchList.iconCheckColor}
  :hover {
    fill: ${props => props.theme.widgets.matchList.iconCheckColor}
  }
`;
