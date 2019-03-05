import styled from "styled-components";

export const Polyline = styled.polyline`
  fill: none;
  stroke: ${({ theme }) => theme.widgets.hotspot.svgMapStrokeColor};
  stroke-width: 2px;
  stroke-opacity: 1;
  stroke-dasharray: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  z-index: -1;
  pointer-events: none;
`;
