import styled from "styled-components";

export const ModeButton = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid
    ${({ active, theme }) =>
      active
        ? theme.widgets.tokenHighlight.modeButtonActiveBorderColor
        : theme.widgets.tokenHighlight.modeButtonBorderColor};
  color: ${props => props.theme.widgets.tokenHighlight.modeButtonColor};
  background: ${({ active, theme }) =>
    active ? theme.widgets.tokenHighlight.modeButtonActiveBgColor : theme.widgets.tokenHighlight.modeButtonBgColor};
  &:focus {
    outline: none;
  }
`;
