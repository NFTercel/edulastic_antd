import styled from "styled-components";

export const Points = styled.span`
  font-family: '${props => props.theme.widgets.clozeImageText.pointsFontFamily}';
  font-size: ${props => props.theme.widgets.clozeImageText.pointsFontSize};
  font-weight: ${props => props.theme.widgets.clozeImageText.pointsFontWeight};
  line-height: 1.36em;
  letter-spacing: 0.2;
  text-transform: uppercase;
  color: ${props => props.theme.widgets.clozeImageText.pointsColor};
`;
