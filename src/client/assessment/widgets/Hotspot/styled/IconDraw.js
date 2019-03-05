import styled from "styled-components";
import { IconDraw as Icon } from "@edulastic/icons";

export const IconDraw = styled(Icon)`
  width: 42px;
  height: 42px;
  margin-bottom: 10px;
  fill: ${props => props.theme.widgets.hotspot.iconDrawColor}
  :hover {
    fill: ${props => props.theme.widgets.hotspot.iconDrawColor}
  }
`;
