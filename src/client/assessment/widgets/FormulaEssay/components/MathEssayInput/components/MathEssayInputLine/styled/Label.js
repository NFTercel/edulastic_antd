import styled from "styled-components";

export const Label = styled.div`
  position: absolute;
  right: 0;
  top: -14px;
  width: 70px;
  height: 14px;
  line-height: 14px;
  background: ${props => props.theme.mathEssayInput.inputLineLabelBgColor};
  color: ${props => props.theme.mathEssayInput.inputLineLabelColor};
  text-transform: uppercase;
  text-align: center;
  font-size: ${props => props.theme.mathEssayInput.inputLineLabelFontSize};
`;
