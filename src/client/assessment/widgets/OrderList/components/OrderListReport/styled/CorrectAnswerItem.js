import styled from "styled-components";

export const CorrectAnswerItem = styled.div`
  width: calc(100% - 40px);
  display: flex;
  align-items: stretch;
  margin-bottom: 10px;
  cursor: pointer;
  background: ${props => props.theme.widgets.orderList.correctAnswerItemBgColor};
  margin-left: 40px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 2px solid ${props => props.theme.widgets.orderList.correctAnswerItemBorderColor};
`;
