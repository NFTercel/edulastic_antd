import styled from "styled-components";

export const AddNewChoiceBtn = styled.a`
  width: 227px;
  height: 40px;
  border-radius: 4px;
  border: solid 1px ${props => props.theme.common.addNewChoiceButtonBorderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  font-family: '${props => props.theme.common.addNewChoiceButtonFontFamily}';
  text-transform: uppercase;
  font-size: ${props => props.theme.common.addNewChoiceButtonFontSize};
  font-weight: ${props => props.theme.common.addNewChoiceButtonFontWeight};
  font-style: ${props => props.theme.common.addNewChoiceButtonFontStyle};
  font-stretch: ${props => props.theme.common.addNewChoiceButtonFontStretch};
  line-height: 1.36;
  letter-spacing: 0.2px;
  text-align: center;
  color: ${props => props.theme.common.addNewChoiceButtonColor};

  &:hover {
    background-color: ${props => props.theme.common.addNewChoiceButtonBgHoverColor};
    color: ${props => props.theme.common.addNewChoiceButtonHoverColor};
  }
  &:active {
    background-color: ${props => props.theme.common.addNewChoiceButtonBgActiveColor};
    color: ${props => props.theme.common.addNewChoiceButtonActiveColor};
  }
`;
