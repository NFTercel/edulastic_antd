import styled from "styled-components";
import { IconTrash as Icon } from "@edulastic/icons";

export const IconTrash = styled(Icon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  fill: ${props => props.theme.widgets.mathFormula.iconTrashColor}
  :hover {
    fill: ${props => props.theme.widgets.mathFormula.iconTrashHoverColor}
  }
`;
