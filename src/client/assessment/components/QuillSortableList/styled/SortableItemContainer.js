import styled from "styled-components";

export const SortableItemContainer = styled.div`
  width: ${props => (props.columns === 1 ? 100 / props.columns : 100 / props.columns - 2)}%;
  font-size: ${props => props.fontSize || "14px"} !important;
  min-height: 50px;
  margin: 10px 0;
  display: inline-flex;
  flex-direction: column;

  .ql-container {
    font-size: ${props => props.fontSize || "14px"} !important;
  }

  & div.main {
    border-radius: 4px;
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
`;
