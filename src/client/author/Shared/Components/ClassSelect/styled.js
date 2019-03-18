import styled from "styled-components";
import { Select } from "antd";
import { themes } from "../../../../student/themes";
const classBoardTheme = themes.default.classboard;

export const Container = styled.div`
  display: flex;
  align-items: center;

  .ant-select {
    width: 168px;
  }

  svg {
    width: 18px !important;
  }

  .ant-select-selection__rendered {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: ${classBoardTheme.SortBarSelectionColor};
  }

  .ant-select-arrow {
    color: #0e93dc;
  }

  .ant-select-selection-selected-value {
    display: flex !important;
    width: 100% !important;
    align-items: center !important;
  }
`;

export const StyledClassID = styled.div`
  color: #4aac8b;
  border: 1px solid #4aac8b;
  border-radius: 50%;
  line-height: 20px;
  height: 20px;
  width: 20px;
  margin-right: 10px;
  text-align: center;
  font-size: 10px;
`;

export const StyledSelect = styled(Select)`
  width: 120px;
  display:inline-block @media (max-width: 550px) {
    display: none;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;
