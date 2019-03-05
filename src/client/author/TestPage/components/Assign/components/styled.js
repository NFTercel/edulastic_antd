import { Table } from "antd";
import styled from "styled-components";
import { secondaryTextColor, white } from "@edulastic/colors";

export const StyledTable = styled(Table)`
  .ant-table table {
    border-collapse: separate;
    border-spacing: 0px 10px;
  }

  .ant-table-thead > tr > th {
    background: #f5f9fe;
    font-size: 13px;
    font-weight: 600;
    color: ${secondaryTextColor};
  }

  .ant-table-row {
    font-size: 13px;

    td {
      background: ${white} !important;
      border-top: 1px solid #f8f8f8;
      border-bottom: 1px solid #f8f8f8;
    }

    td:first-child {
      border-left: 1px solid #f8f8f8;
      border-radius: 5px;
    }

    td:last-child {
      border-radius: 5px;
      border-right: 1px solid #f8f8f8;
    }

    &:hover {
      box-shadow: 0 10px 10px 0 rgba(150, 180, 191, 0.1);
    }
  }
`;
