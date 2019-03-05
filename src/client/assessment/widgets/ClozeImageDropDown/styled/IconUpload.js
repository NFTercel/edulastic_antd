import styled from "styled-components";
import { IconUpload as Icon } from "@edulastic/icons";

export const IconUpload = styled(Icon)`
  width: 100px;
  height: 100px;
  fill: ${props => props.theme.widgets.clozeImageDropDown.iconUploadColor}
  :hover {
    fill: ${props => props.theme.widgets.clozeImageDropDown.iconUploadColor}
  }
`;
