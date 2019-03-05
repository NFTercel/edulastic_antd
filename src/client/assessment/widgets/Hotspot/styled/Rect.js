import styled from "styled-components";

export const Rect = styled.rect`
  z-index: 5;
  cursor: inherit;
  fill: ${({ theme }) => theme.widgets.hotspot.svgMapStrokeColor};
  stroke: ${({ theme }) => theme.widgets.hotspot.svgMapStrokeColor};
  stroke-width: 2px;
  stroke-opacity: 1;
  stroke-dasharray: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill-opacity: 1;
`;
