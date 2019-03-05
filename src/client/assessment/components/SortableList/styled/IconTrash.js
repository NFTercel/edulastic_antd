import styled from "styled-components";
import { IconTrashAlt as Icon } from "@edulastic/icons";

export const IconTrash = styled(Icon)`
  fill: ${props => props.theme.sortableList.iconTrashColor};
  :hover {
    fill: ${props => props.theme.sortableList.iconTrashHoverColor};
  }
  width: 16px;
  height: 16px;
`;
