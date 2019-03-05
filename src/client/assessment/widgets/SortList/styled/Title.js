import styled from "styled-components";

export const Title = styled.p`
  text-align: center;
  width: 100%;
  font-weight: ${props => props.theme.widgets.sortList.titleFontWeight};
  margin-bottom: ${({ smallSize }) => (smallSize ? 5 : 15)}px;
  font-size: ${props => props.theme.widgets.sortList.titleFontSize};
  color: ${props => props.theme.widgets.sortList.titleColor};
  text-transform: uppercase;
`;
