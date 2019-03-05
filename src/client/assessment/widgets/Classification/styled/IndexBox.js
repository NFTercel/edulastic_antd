import styled from "styled-components";

export const IndexBox = styled.div`
  font-size: ${props => props.theme.widgets.classification.indexBoxFontSize};
  font-weight: ${props => props.theme.widgets.classification.indexBoxFontWeight};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  color: ${props => props.theme.widgets.classification.indexBoxColor};
  background: ${({ preview, valid, theme }) =>
    valid && preview
      ? theme.widgets.classification.indexBoxValidBgColor
      : preview && valid !== undefined
      ? theme.widgets.classification.indexBoxNotValidBgColor
      : theme.widgets.classification.indexBoxBgColor};
`;
