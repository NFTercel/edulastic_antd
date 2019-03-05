import styled from "styled-components";

export const Circle = styled.circle`
  stroke: ${({ theme, intersect }) =>
    intersect ? theme.widgets.hotspot.intersectStrokeColor : theme.widgets.hotspot.svgMapStrokeColor};
  stroke-width: 1px;
  stroke-opacity: 1;
  stroke-dasharray: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: ${({ theme, intersect }) =>
    intersect ? theme.widgets.hotspot.intersectStrokeColor : theme.widgets.hotspot.svgMapStrokeColor};
  fill-opacity: 1;
  z-index: ${({ intersect }) => (intersect ? 12 : 10)};
  cursor: ${({ cursor }) => cursor || "normal"};
`;
