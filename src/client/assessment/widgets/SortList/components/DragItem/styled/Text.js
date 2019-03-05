import styled from "styled-components";

export const Text = styled.div`
  resize: none;
  width: ${({ showDragHandle, smallSize }) =>
    showDragHandle ? (smallSize ? "calc(100% - 30px)" : "calc(100% - 50px)") : "100%"};
  height: 100%;
  border: ${({ checkStyle }) => (checkStyle ? "none" : "")};
  border-left: ${({ checkStyle, correct, theme }) =>
    checkStyle
      ? correct
        ? `2px solid ${theme.widgets.sortList.dragItemCorrectTextBorderColor}`
        : `2px solid ${theme.widgets.sortList.dragItemIncorrectTextBorderColor}`
      : "none"};
  background: ${({ checkStyle, correct, theme }) =>
    checkStyle
      ? correct
        ? `${theme.widgets.sortList.dragItemCorrectTextBgColor}`
        : `${theme.widgets.sortList.dragItemIncorrectTextBgColor}`
      : "none"};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  min-height: ${({ smallSize }) => (smallSize ? 20 : 31)}px;
  padding: ${({ smallSize }) => (smallSize ? "5px" : "15px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ smallSize, theme }) =>
    smallSize ? theme.widgets.sortList.dragItemTextSmallFontSize : theme.widgets.sortList.dragItemTextFontSize};
`;
