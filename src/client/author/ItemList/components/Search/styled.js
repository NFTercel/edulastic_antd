import styled from "styled-components";
import { blue, mainTextColor, secondaryTextColor } from "@edulastic/colors";

export const Container = styled.div`
  padding: 27px 0;

  .ant-select {
    width: 100%;
    min-width: 100%;
  }

  .ant-select-selection {
    background: transparent;
  }

  .ant-select-lg {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
  }

  .ant-select-selection__choice {
    border-radius: 5px;
    border: solid 1px #c8e8f6;
    background-color: #c8e8f6;
    height: 23.5px;
  }

  .ant-select-selection__choice__content {
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: #0083be;
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
      fill: #00b0ff;
    }
  }
`;

export const MainFilterItems = styled.div`
  margin-top: 4px;
`;

export const Item = styled.div`
  margin-top: 13px;
`;

export const ItemHeader = styled.span`
  font-size: 13px;
  color: ${secondaryTextColor};
  font-weight: 600;
  letter-spacing: 0.2px;
`;

export const ItemBody = styled.div`
  margin-top: 11px;
  height: 40px;

  .ant-select-selection {
    height: 40px;
    background: transparent;
    padding-top: 4px;
  }

  .ant-select-selection__choice {
    border-radius: 5px;
    border: solid 1px ${mainTextColor};
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
    margin-left: 22px;
  }

  .ant-select-arrow-icon {
    color: ${blue};
  }
`;
