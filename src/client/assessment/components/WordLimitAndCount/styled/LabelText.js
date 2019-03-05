import styled from "styled-components";

export const LabelText = styled.span`
  font-size: ${props => props.theme.wordLimitAndCount.labelFontSize};
  font-weight: ${props => props.theme.wordLimitAndCount.labelFontWeight};
  color: ${props => props.theme.wordLimitAndCount.labelColor};
`;
