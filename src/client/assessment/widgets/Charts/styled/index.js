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
  stroke: ${({ color }) => color || mainBlueColor};
  fill: ${({ color }) => color || mainBlueColor};
`;

const getRightColor = (hoverState, color) => (hoverState ? darkBlue : color || mainBlueColor);

export const ActiveBar = styled.rect`
  cursor: pointer;
  z-index: 10;
  stroke: ${({ hoverState, color }) => getRightColor(hoverState, color)};
  fill: ${({ hoverState, color }) => getRightColor(hoverState, color)};
`;

export const StrokedRect = styled.rect`
  z-index: 1;
  stroke: ${({ hoverState }) => (hoverState ? "black" : "none")};
  stroke-width: 2;
  stroke-dasharray: 10 5;
  fill: none;
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
