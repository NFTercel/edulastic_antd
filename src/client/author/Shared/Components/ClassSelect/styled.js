import styled from "styled-components";
import { Select } from "antd";
import { themes } from "../../../../student/themes";
const classBoardTheme = themes.default.classboard;

export const Container = styled.div`
  display: flex;
  align-items: center;

  .ant-select {
    margin-right: 23px;
    width: 128px;
  }

  svg {
    margin-right: 23px;
    width: 18px !important;
  }

  .ant-select-selection__rendered {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: ${classBoardTheme.SortBarSelectionColor};
  }
`;

export const StyledSelect = styled(Select)`
  display:inline-block @media (max-width: 550px) {
    display: none;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;
