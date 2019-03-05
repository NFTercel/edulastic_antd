import styled from "styled-components";

export const Button = styled.button`
  background: ${props => props.theme.keyboard.buttonBgColor};
  color: ${props => props.theme.keyboard.buttonColor};
  border: 0;
  height: 50px;
  width: ${props => props.width || 50}px;
  cursor: pointer;
  font-size: ${props => props.theme.keyboard.buttonFontSize};
  font-weight: ${props => props.theme.keyboard.buttonFontWeight};
  border: 1px solid ${props => props.theme.keyboard.buttonBorderColor};
  border-top: 0;
  border-left: 0;

  &.active {
    background: ${props => props.theme.keyboard.buttonBgActiveClassColor};
  }

  :hover {
    background: ${props => props.theme.keyboard.buttonBgHoverColor};
  }

  :active {
    background: ${props => props.theme.keyboard.buttonBgActiveColor};
  }
`;
