import styled from "styled-components";
import { IconPencilEdit as Icon } from "@edulastic/icons";

export const IconPencilEdit = styled(Icon)`
  fill: ${props => props.theme.questionMetadata.iconPencilEditColor};
  :hover {
    fill: ${props => props.theme.questionMetadata.iconPencilEditColor};
  }
  width: 16px;
  height: 16px;
`;
