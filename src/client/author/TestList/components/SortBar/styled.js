import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;

  .ant-select {
    margin-right: 23px;
    width: 128px;
  }

  svg {
    cursor: pointer
    margin-right: 23px;
    width: 18px !important;
  }

  .ant-select-selection__rendered {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
  }

  .ant-select-arrow-icon {
    svg {
      fill: #00b0ff;
      margin-right: 0px;
    }
  }
`;
