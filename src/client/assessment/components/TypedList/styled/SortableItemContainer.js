import styled from "styled-components";

export const SortableItemContainer = styled.div`
  width: ${props => (props.columns === 1 ? 100 / props.columns : 100 / props.columns - 2)}%;
  min-height: 50px;
  margin: 10px 0;
  display: inline-flex;
  align-items: center;

  & div.main {
    border-radius: 4px;
    border: solid 1px ${props => props.theme.typedList.itemContainerBorderColor};
    margin-right: 10px;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }
  & div.main i.fa-align-justify {
    color: ${props => props.theme.typedList.dragIconColor};
    font-size: ${props => props.theme.typedList.dragIconFontSize};
    padding: 15px;
  }
`;
