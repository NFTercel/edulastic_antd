import styled from "styled-components";

export const Text = styled.div`
  resize: none;
  width: ${({ showDragHandle, smallSize }) =>
    showDragHandle ? (smallSize ? "calc(100% - 30px)" : "calc(100% - 50px)") : "100%"};
  border: none;
  height: 100%;
  border: 1px solid ${props => props.theme.widgets.orderList.textBorderColor};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  min-height: 30px;
  padding: ${({ smallSize }) => (smallSize ? "5px" : "15px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
