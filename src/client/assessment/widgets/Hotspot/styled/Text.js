import styled from "styled-components";

export const Text = styled.text`
  z-index: 6;
  cursor: inherit;
  font-family: ${props => props.theme.widgets.hotspot.textFontFamily};
  fill: ${props => props.theme.widgets.hotspot.textFillColor};
  font-weight: ${props => props.theme.widgets.hotspot.textFontWeight};
  font-size: ${props => props.theme.widgets.hotspot.textFontSize};
  opacity: 1;
  text-anchor: start;
  user-select: none;
`;
