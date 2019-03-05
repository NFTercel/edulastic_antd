import styled from "styled-components";
import { IconTrash as Icon } from "@edulastic/icons";

export const IconTrash = styled(Icon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  fill: ${props => props.theme.widgets.matchList.iconTrashColor}
  :hover {
    fill: ${props => props.theme.widgets.matchList.iconTrashHoverColor}
  }
`;
