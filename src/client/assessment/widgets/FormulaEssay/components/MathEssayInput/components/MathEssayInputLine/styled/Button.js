import styled from "styled-components";

export const Button = styled.div`
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: ${props => props.theme.mathEssayInput.inputLineButtonFontSize};
  border: 1px solid ${props => props.theme.mathEssayInput.inputLineButtonBorderColor};
  border-radius: 5px;
  margin-right: 15px;
  cursor: pointer;

  :hover,
  &.active {
    background: ${props => props.theme.mathEssayInput.inputLineButtonBgHoverActiveClassColor};
    color: ${props => props.theme.mathEssayInput.inputLineButtonHoverActiveClassColor};
  }

  :last-child {
    margin-right: 0;
  }
`;
