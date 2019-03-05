import styled from "styled-components";
import { tabletWidth } from "@edulastic/colors";

export const CorrectAnswerHeader = styled.div`
  width: 100%;
  height: 67px;
  padding: 11px 16px;
  background: ${props => props.theme.widgets.clozeImageText.correctAnswerHeaderBgColor};
  align-items: center;
  margin-bottom: 17px;
  font-family: '${props => props.theme.widgets.clozeImageText.correctAnswerHeaderFontFamily}';
  font-size: ${props => props.theme.widgets.clozeImageText.correctAnswerHeaderFontSize};
  font-weight: ${props => props.theme.widgets.clozeImageText.correctAnswerHeaderFontWeight};
  line-height: 1.38;
  letter-spacing: 0.2px;
  text-align: left;
  color: ${props => props.theme.widgets.clozeImageText.correctAnswerHeaderColor};

  @media (max-width: ${tabletWidth}) {
    width: 100%;
  }
`;
