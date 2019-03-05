import styled from "styled-components";
import { IconTrash as Icon } from "@edulastic/icons";

export const IconTrash = styled(Icon)`
  width: 42px;
  height: 42px;
  margin-bottom: 10px;
  fill: ${props => props.theme.widgets.hotspot.iconTrashColor}
  :hover {
    fill: ${props => props.theme.widgets.hotspot.iconTrashColor}
  }
`;
