import styled from "styled-components";

export const SortableItemContainer = styled.div`
  width: 100%;
  height: 50px;
  margin: 10px 0;
  display: flex;
  align-items: center;

  & div.main {
    border-radius: 10px;
    border: solid 1px ${props => props.theme.sortableList.itemContainerBorderColor};
    margin-right: 10px;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }
  & div.main i.fa-align-justify {
    color: ${props => props.theme.sortableList.dragIconColor};
    font-size: ${props => props.theme.sortableList.dragIconFontSize};
    padding: 15px;
  }
  & div.main div {
    border-left: solid 1px ${props => props.theme.sortableList.itemContainerBorderColor};
    padding: 10px 30px;
    flex: 1;
    height: 100%;
    display: flex;
    box-sizing: border-box;
  }

  & div.main input {
    font-size: ${props => props.theme.sortableList.inputFontSize};
    line-height: 1.38;
    letter-spacing: 1px;
    text-align: left;
    color: ${props => props.theme.sortableList.inputColor};
    border: none;
    padding: 0 10px;
  }
`;
