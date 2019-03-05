import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  padding-left: 10px;
  color: ${props => props.theme.widgets.sortList.dragHandleContainerColor};
  font-size: ${props =>
    props.smallSize
      ? props.theme.widgets.sortList.dragHandleContainerSmallFontSize
      : props.theme.widgets.sortList.dragHandleContainerFontSize};

  :hover {
    cursor: pointer;
    color: ${props => props.theme.widgets.sortList.dragHandleContainerHoverColor};
  }
`;
