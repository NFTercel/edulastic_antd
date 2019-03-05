import styled from "styled-components";

export const ItemBody = styled.div`
  margin-top: 11px;
  height: 40px;

  .ant-select-selection {
    height: 40px;
    background: ${props => props.theme.questionMetadata.antSelectSelectionBgColor};
    padding-top: 4px;
  }

  .ant-select-selection__choice {
    border-radius: 5px;
    border: solid 1px ${props => props.theme.questionMetadata.antSelectSelectionChoiceBorderColor};
  }

  .ant-select-selection__choice__content {
    font-size: ${props => props.theme.questionMetadata.antSelectSelectionChoiceContentFontSize};
    font-weight: ${props => props.theme.questionMetadata.antSelectSelectionChoiceContentFontWeight};
    color: ${props => props.theme.questionMetadata.antSelectSelectionChoiceContentColor};
  }

  .ant-select-selection-selected-value {
    font-size: ${props => props.theme.questionMetadata.antSelectSelectionSelectedValueFontSize};
    font-weight: ${props => props.theme.questionMetadata.antSelectSelectionSelectedValueFontWeight};
    letter-spacing: 0.2px;
    color: ${props => props.theme.questionMetadata.antSelectSelectionSelectedValueColor};
  }

  .ant-select-selection__rendered {
    margin-left: 22px;
  }

  .ant-select-arrow-icon {
    color: ${props => props.theme.questionMetadata.antSelectArrowIconColor};
  }
`;
