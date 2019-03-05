import styled from "styled-components";

export const Label = styled.label`
  font-size: ${props => props.theme.widgetOptions.labelFontSize};
  font-weight: ${props => props.theme.widgetOptions.labelFontWeight};
  font-style: ${props => props.theme.widgetOptions.labelFontStyle};
  font-stretch: ${props => props.theme.widgetOptions.labelFontStretch};
  line-height: 1.38;
  letter-spacing: 0.2px;
  text-align: left;
  color: ${props => props.theme.widgetOptions.labelColor};
  margin-bottom: 10px;
  display: block;
`;
