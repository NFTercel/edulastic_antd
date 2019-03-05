import styled from "styled-components";
import { IconClose as Icon } from "@edulastic/icons";

export const IconClose = styled(Icon)`
  width: 10px;
  height: 10px;
  fill: ${props => props.theme.widgets.hotspot.iconCloseColor}
  :hover {
    fill: ${props => props.theme.widgets.hotspot.iconCloseHoverColor}
  }
`;
