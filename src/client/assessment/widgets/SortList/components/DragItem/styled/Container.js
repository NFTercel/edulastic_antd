import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  cursor: pointer;
  border-radius: 4px;
  border: ${props =>
    props.style && props.style.border
      ? props.style.border
      : `1px solid ${props.theme.widgets.sortList.dragItemContainerBorderColor}`};
`;
