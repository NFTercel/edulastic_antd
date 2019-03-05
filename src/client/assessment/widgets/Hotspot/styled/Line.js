import styled from "styled-components";

export const Line = styled.line`
  stroke: ${({ theme, intersect }) =>
    intersect ? theme.widgets.hotspot.intersectStrokeColor : theme.widgets.hotspot.svgMapStrokeColor};
  stroke-width: 2px;
  stroke-opacity: 1;
  stroke-dasharray: 6, 8;
  stroke-linecap: round;
  stroke-linejoin: round;
  z-index: 0;
  pointer-events: none;
`;
