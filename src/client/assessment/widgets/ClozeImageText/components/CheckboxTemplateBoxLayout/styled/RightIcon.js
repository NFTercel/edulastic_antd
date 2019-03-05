import styled from "styled-components";
import { IconCheck } from "@edulastic/icons";

export const RightIcon = styled(IconCheck)`
  width: 8px;
  height: 8px;
  fill: ${props => props.theme.widgets.clozeImageText.rightIconColor};
  &:hover {
    fill: ${props => props.theme.widgets.clozeImageText.rightIconColor};
  }
`;
