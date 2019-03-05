import styled from "styled-components";
import { IconDrawResize as Icon } from "@edulastic/icons";

export const IconDrawResize = styled(Icon)`
  width: 20px;
  height: 20px;
  fill: ${props => props.theme.widgets.clozeImageDropDown.iconDrawResizeColor}
  :hover {
    fill: ${props => props.theme.widgets.clozeImageDropDown.iconDrawResizeColor}
  }
`;
