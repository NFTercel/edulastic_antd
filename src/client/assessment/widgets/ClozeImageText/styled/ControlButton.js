import styled from "styled-components";

export const ControlButton = styled.button`
  width: 100px;
  height: 100px;
  white-space: normal;
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  background: ${props => props.theme.widgets.clozeImageText.controlButtonBgColor};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: '${props => props.theme.widgets.clozeImageText.controlButtonFontFamily}';
  font-size: ${props => props.theme.widgets.clozeImageText.controlButtonFontSize};
  font-weight: ${props => props.theme.widgets.clozeImageText.controlButtonFontWeight};
  line-height: 1.36;
  color: ${props => props.theme.widgets.clozeImageText.controlButtonColor};
  cursor: pointer;

  &:not([disabled]) {
    background: ${props => props.theme.widgets.clozeImageText.controlButtonNotDisabledBgColor};
    box-shadow: 0 3px 6px 0 ${props => props.theme.widgets.clozeImageText.controlButtonNotDisabledShadowColor};
  }
`;
