import styled from "styled-components";

export const SectionHeading = styled.div`
  color: ${props => props.theme.widgetOptions.sectionHeadingColor};
  margin-bottom: 35px;
  font-size: ${props => props.theme.widgetOptions.sectionHeadingFontSize};
  font-weight: ${props => props.theme.widgetOptions.sectionHeadingFontWeight};
  font-style: ${props => props.theme.widgetOptions.sectionHeadingFontStyle};
  font-stretch: ${props => props.theme.widgetOptions.sectionHeadingFontStretch};
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;
`;
