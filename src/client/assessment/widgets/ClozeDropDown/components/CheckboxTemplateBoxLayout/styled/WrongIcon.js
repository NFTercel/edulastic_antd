import styled from "styled-components";
import { IconClose } from "@edulastic/icons";

export const WrongIcon = styled(IconClose)`
  width: 8px;
  height: 8px;
  fill: ${props => props.theme.widgets.clozeDropDown.wrongIconColor};
  &:hover {
    fill: ${props => props.theme.widgets.clozeDropDown.wrongIconColor};
  }
`;
