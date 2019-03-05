import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.widgets.orderList.dragHandleIconContainerColor};
  font-size: ${props =>
    props.smallSize
      ? props.theme.widgets.orderList.dragHandleIconContainerSmallFontSize
      : props.theme.widgets.orderList.dragHandleIconContainerFontSize};

  :hover {
    cursor: pointer;
    color: ${props => props.theme.widgets.orderList.dragHandleIconContainerHoverColor};
  }
`;
