import styled from "styled-components";

export const Container = styled.div`
  width: ${props => (props.columns === 1 ? 100 / props.columns : 100 / props.columns - 2)}%;
  display: inline-flex;
  align-items: stretch;
  margin-bottom: 10px;
  background: ${({ correct, theme }) =>
    correct ? theme.widgets.orderList.correctContainerBgColor : theme.widgets.orderList.incorrectContainerBgColor};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 2px solid
    ${({ correct, theme }) =>
      correct
        ? theme.widgets.orderList.correctContainerBorderColor
        : theme.widgets.orderList.incorrectContainerBorderColor};
`;
