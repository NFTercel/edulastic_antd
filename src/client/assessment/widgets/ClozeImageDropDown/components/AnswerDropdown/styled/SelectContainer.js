import styled from "styled-components";

export const SelectContainer = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  align-items: center;
  border: none;

  .ant-select {
    height: 40px;
    width: 100%;
    &::selection {
      background: ${props => props.theme.widgets.clozeImageDropDown.antSelectSelectionBgColor};
    }
  }
  .ant-select-selection {
    display: flex;
    align-items: center;
    padding-left: 10px;
    border: 1px solid;
    border-color: ${props => props.theme.widgets.clozeImageDropDown.antSelectSelectionBorderColor};

    &:hover {
      border: 1px solid;
      border-color: ${props => props.theme.widgets.clozeImageDropDown.antSelectSelectionBorderColor};
    }
  }
  .ant-select-selection-selected-value {
    font-size: ${props => props.theme.widgets.clozeImageDropDown.antSelectSelectionFontSize};
    font-weight: ${props => props.theme.widgets.clozeImageDropDown.antSelectSelectionFontWeight};
    letter-spacing: 0.2px;
    color: ${props => props.theme.widgets.clozeImageDropDown.antSelectSelectionColor};
  }
  .anticon-down {
    svg {
      fill: ${props => props.theme.widgets.clozeImageDropDown.antIconDownColor};
    }
  }
  @media (max-width: 760px) {
    height: 52px;
    width: 188px;
  }
`;
