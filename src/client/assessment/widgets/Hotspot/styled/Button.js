import styled from "styled-components";

export const Button = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${props => props.theme.widgets.hotspot.buttonBgColor};
  color: ${props => props.theme.widgets.hotspot.buttonColor};
  cursor: pointer;
  user-select: none;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  svg {
    fill: ${props => props.theme.widgets.hotspot.buttonSvgColor};
  }
  &:hover {
    color: ${props => props.theme.widgets.hotspot.buttonHoverColor};
    svg {
      fill: ${props => props.theme.widgets.hotspot.buttonHoverSvgColor};
    }
  }
`;
