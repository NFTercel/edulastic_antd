import styled from "styled-components";
import { Select } from "antd";

export const StyledSelect = styled(Select)`
  & > .ant-select-selection {
    display: flex;
    align-items: center;
    padding: 0px;
    line-height: 40px;
    height: 40px;
    background: ${props => props.theme.widgets.highlightImage.styledSelectBgColor};
    border: none;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;
