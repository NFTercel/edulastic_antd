import styled from "styled-components";
import { white, blue, newBlue, secondaryTextColor } from "@edulastic/colors";

export const Container = styled.div`
  padding: 0 0 20px;

  .ant-select {
    width: 100%;
    min-width: 100%;
  }

  .ant-select-lg .ant-select-selection--multiple .ant-select-selection__rendered li {
    height: 24px;
    line-height: 24px;
    margin-top: 8px;
  }

  .ant-select-selection--multiple .ant-select-selection__rendered {
    margin-left: 8px;
  }

  .ant-select-selection {
    background: ${white};
    border: 0;
  }

  .ant-select-lg {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
  }

  .ant-select-selection__choice {
    border-radius: 5px;
    border: 0;
    background-color: rgba(23, 115, 240, 0.2);
    height: 23.5px;
    color: ${newBlue};
  }

  .ant-select-selection__choice__content {
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: ${newBlue};
    opacity: 1;
  }

  .ant-select-remove-icon {
    svg {
      fill: #0083be;
    }
  }

  .ant-select-arrow-icon {
    font-size: 14px;
    svg {
      fill: ${newBlue};
    }
  }
`;

export const MainFilterItems = styled.div`
  margin-top: 4px;
`;

export const Item = styled.div`
  margin-top: 10px;
`;

export const ItemHeader = styled.span`
  display: block;
  font-size: 12px;
  color: ${secondaryTextColor};
  font-weight: 600;
  letter-spacing: 0.2px;
  margin-bottom: 8px;
`;

export const ItemBody = styled.div`
  margin-top: 11px;
  height: 40px;

  .ant-select-selection {
    height: 40px;
    background: ${white};
    padding-top: 0;
    border: 0;
  }

  .ant-select-selection__choice {
    background: ${white};
    border-radius: 5px;
    border: 0;
  }

  .ant-select-selection__choice__content {
    font-size: 9px;
    font-weight: bold;
    color: ${secondaryTextColor};
  }

  .ant-select-selection-selected-value {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: ${secondaryTextColor};
  }

  .ant-select-selection__rendered {
    margin-left: 12px;
  }

  .ant-select-arrow-icon {
    color: ${blue};
  }
`;
