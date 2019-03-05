import styled from "styled-components";

export const Index = styled.span`
  font-size: ${props => props.theme.widgets.orderList.indexFontSize};
  margin-right: 50px;
  font-weight: ${props => props.theme.widgets.orderList.indexFontWeight};
  color: ${({ color, theme }) => color || theme.widgets.orderList.indexColor};
`;
