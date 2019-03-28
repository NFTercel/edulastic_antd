import styled from "styled-components";

import { dashBorderColor, mainBlueColor, darkBlue } from "@edulastic/colors";
import { IconTrash as Icon } from "@edulastic/icons";

export const Line = styled.line`
  shape-rendering: crispEdges;
  stroke: ${dashBorderColor};
  stroke-width: ${({ strokeWidth }) => strokeWidth};
`;

export const Circle = styled.circle`
  cursor: pointer;
  z-index: 10;
  stroke: ${mainBlueColor};
  fill: ${mainBlueColor};
`;

export const Bar = styled.rect`
  cursor: pointer;
  z-index: 0;
  stroke: ${mainBlueColor};
  fill: ${mainBlueColor};
`;

export const ActiveBar = styled.rect`
  cursor: pointer;
  z-index: 10;
  stroke: ${({ hoverState }) => (hoverState ? darkBlue : mainBlueColor)};
  fill: ${({ hoverState }) => (hoverState ? darkBlue : mainBlueColor)};
`;

export const Text = styled.text`
  user-select: none;
`;

export const Group = styled.g`
  background: ${({ active }) => (active === null ? "transparent" : "black")};
  z-index: 1;
`;

export const IconTrash = styled(Icon)`
  fill: ${props => props.theme.sortableList.iconTrashColor};
  :hover {
    fill: ${props => props.theme.sortableList.iconTrashHoverColor};
  }
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
