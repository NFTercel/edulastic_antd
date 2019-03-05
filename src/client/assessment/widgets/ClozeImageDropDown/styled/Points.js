import styled from "styled-components";

export const Points = styled.span`
  font-family: '${props => props.theme.widgets.clozeImageDropDown.pointsFontFamily}';
  font-size: ${props => props.theme.widgets.clozeImageDropDown.pointsFontSize};
  font-weight: ${props => props.theme.widgets.clozeImageDropDown.pointsFontWeight};
  line-height: 1.36em;
  letter-spacing: 0.2;
  text-transform: uppercase;
  color: ${props => props.theme.widgets.clozeImageDropDown.pointsColor};
`;
