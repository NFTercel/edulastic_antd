import styled from "styled-components";
import { IconTrash as Icon } from "@edulastic/icons";

export const IconTrash = styled(Icon)`
  fill: ${props => props.theme.questionMetadata.iconTrashColor};
  :hover {
    fill: ${props => props.theme.questionMetadata.iconTrashColor};
  }
  width: 16px;
  height: 16px;
`;
