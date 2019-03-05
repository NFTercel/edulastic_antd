import styled from "styled-components";

export const ButtonWithShadow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 103px;
  cursor: pointer;
  height: 105px;
  border-radius: 4px;
  box-shadow: ${({ active, theme }) =>
    active ? `1px 3px 6px 0 ${theme.widgets.hotspot.withShadowButtonShadowColor}` : "none"};
  background-color: ${({ active, theme }) =>
    active ? theme.widgets.hotspot.withShadowButtonActiveBgColor : theme.widgets.hotspot.withShadowButtonBgColor};
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 1px 3px 6px 0 ${({ theme }) => theme.widgets.hotspot.withShadowButtonShadowColor};
  }
`;
