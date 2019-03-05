import styled from "styled-components";

export const Subtitle = styled.div`
  font-size: ${({ fontSize, theme }) => fontSize || theme.common.subtitleFontSize};
  font-weight: ${props => props.theme.common.subtitleFontWeight};
  font-style: ${props => props.theme.common.subtitleFontStyle};
  font-stretch: ${props => props.theme.common.subtitleFontStretch};
  line-height: 1.36;
  letter-spacing: 0.3px;
  text-align: left;
  color: ${({ color, theme }) => color || theme.common.subtitleColor};
  padding: ${({ padding }) => padding || "30px 0 16px 0"};
  @media screen {
    padding: 16px 0 16px 0;
  }
`;
