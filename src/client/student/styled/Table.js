import { Table } from "antd";
import styled from "styled-components";

const StyledTable = styled(Table)`
  .ant-table table {
    border-collapse: separate;
    border-spacing: 0px 10px;
    @media screen and (max-width: 767px) {
      display: block;
      overflow-x: auto;
      margin-top: 10px;
    }
  }

  .ant-table-thead > tr > th {
    background: ${props => props.theme.skillReport.tableHeaderBgColor};
    font-size: ${props => props.theme.skillReport.tableHeaderTextSize};
    font-weight: 600;
    color: ${props => props.theme.skillReport.tableHeaderTextColor};
    &:hover {
      background: ${props => props.theme.skillReport.tableHeaderHoverBgColor} !important;
      color: ${props => props.theme.skillReport.tableHeaderHoverTextColor} !important;
    }
    @media screen and (max-width: 767px) {
      word-break: unset;
    }
  }

  .ant-table-row {
    font-size: ${props => props.theme.skillReport.tableDataFontSize};

    td {
      background: ${props => props.theme.skillReport.tableDataBgColor} !important;
      border-top: 1px solid ${props => props.theme.skillReport.tableDataBgBorderColor};
      border-bottom: 1px solid ${props => props.theme.skillReport.tableDataBgBorderColor};
      color: ${props => props.theme.skillReport.tableDataTextColor};
      @media screen and (max-width: 767px) {
        word-break: unset;
      }
    }

    td:first-child {
      border-left: 1px solid ${props => props.theme.skillReport.tableDataBgBorderColor};
      border-radius: 5px 0px 0px 5px;
    }

    td:last-child {
      border-radius: 0px 5px 5px 0px;
      border-right: 1px solid ${props => props.theme.skillReport.tableDataBgBorderColor};
    }

    &:hover {
      box-shadow: 0 10px 10px 0 rgba(150, 180, 191, 0.1);
    }
  }
`;

export default StyledTable;
