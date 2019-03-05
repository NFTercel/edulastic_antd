import styled from "styled-components";
import { IconPlus as Icon } from "@edulastic/icons";

export const IconPlus = styled(Icon)`
  width: 10px;
  height: 10px;
  fill: ${props => props.theme.widgets.multipleChoice.iconPlusColor}
  :hover {
    fill: ${props => props.theme.widgets.multipleChoice.iconPlusColor}
  }
`;
