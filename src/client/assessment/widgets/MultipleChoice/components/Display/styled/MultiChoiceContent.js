import styled from "styled-components";

export const MultiChoiceContent = styled.div`
  font-size: ${props => props.fontSize || props.theme.widgets.multipleChoice.multiChoiceContentFontSize};
  display: flex;
  flex: 1;
  align-items: center;
  font-weight: ${props => props.theme.widgets.multipleChoice.multiChoiceContentFontWeight};
`;
