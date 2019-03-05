import styled from "styled-components";

export const ResponseContainer = styled.span`
  border: 2px dotted
    ${props =>
      props.smallSize
        ? props.theme.widgets.clozeDragDrop.responseContainerSmallBorderColor
        : props.theme.widgets.clozeDragDrop.responseContainerBorderColor};
  min-width: ${props => (props.smallSize ? 140 : 50)}px;
  /* min-height: 30px; */
  padding: 5px 10px;
  margin: 0 10px 5px;
  min-height: ${props => (props.smallSize ? 40 : 30)}px;
  display: inline-flex;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
`;
