import styled from "styled-components";

export const StyledDragHandle = styled.div`
  width: ${props => (props.smallSize ? 30 : 50)}px;
  flex: 1;
  border-top: 1px solid ${props => props.theme.widgets.orderList.dragHandleBorderColor};
  border-bottom: 1px solid ${props => props.theme.widgets.orderList.dragHandleBorderColor};
  border-left: 1px solid ${props => props.theme.widgets.orderList.dragHandleBorderColor};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
