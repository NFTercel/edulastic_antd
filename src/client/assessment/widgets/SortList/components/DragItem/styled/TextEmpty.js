import styled from "styled-components";

export const TextEmpty = styled.div`
  resize: none;
  width: ${({ showDragHandle, smallSize }) =>
    showDragHandle ? (smallSize ? "calc(100% - 30px)" : "calc(100% - 50px)") : "100%"};
  height: 100%;
  border-radius: 4px;
  min-height: ${({ smallSize }) => (smallSize ? 31 : 56)}px;
  padding: ${({ smallSize }) => (smallSize ? "5px" : "15px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ smallSize, theme }) =>
    smallSize
      ? theme.widgets.sortList.dragItemTextEmptySmallFontSize
      : theme.widgets.sortList.dragItemTextEmptyFontSize};
`;
