import styled from "styled-components";

export const IconWrapper = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: ${props => props.theme.widgets.orderList.iconWrapperFontSize};
  color: ${({ color }) => color};
`;
