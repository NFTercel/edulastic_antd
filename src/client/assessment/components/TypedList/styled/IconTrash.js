import styled from "styled-components";
import { IconTrash as Icon } from "@edulastic/icons";

export const IconTrash = styled(Icon)`
  fill: ${props => props.theme.typedList.iconTrashColor};
  :hover {
    fill: ${props => props.theme.typedList.iconTrashHoverColor};
  }
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
