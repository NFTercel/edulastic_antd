import { mobileWidth, tabletWidth } from "@edulastic/colors";
import styled from "styled-components";
import { Table } from "antd";

export const TableData = styled(Table)`
  text-align: center;

  .ant-table-thead > tr > th {
    text-align: center;
  }

  .ant-table-thead > tr > th .ant-table-column-sorters {
    padding-left: 20px;
  }
  @media (max-width: 920px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 20px 0px;
    }
    .ant-table-thead > tr > th .ant-table-column-sorters {
      padding-left: 2px;
      padding-right: 0px;
    }
  }
  @media (max-width: 1000px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding-left: 2px;
    }
    .ant-table-thead > tr > th .ant-table-column-sorters {
      padding-left: 2px;
    }
  }
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters,
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters {
    text-align: center;
  }
  .ant-table-tbody {
    text-align: center;
  }
  .ant-table-tbody > tr > td {
    border-bottom: none;
  }
  @media (max-width: ${tabletWidth}) {
    display: none;
  }
  .ant-table-row-expand-icon {
    display: none;
  }
  @media (max-width: 1300px) and (min-width: 980px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      max-width: 100px;
    }
    .ant-table-thead > tr > th .ant-table-column-sorters {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
  @media (max-width: 1170px) {
    .ant-table-thead > tr > th {
      font-size: 10px;
    }
    .ant-table-tbody > tr > td {
      font-size: 9px;
    }
  }
  @media (max-width: 1170px) {
    .ant-table-thead > tr > th {
      font-size: 9px;
    }
    .ant-table-tbody > tr > td {
      font-size: 9px;
    }
  }
`;

export const ExpandedTable = styled(Table)`
  @media (max-width: 980px) {
    margin-left: 13px;
    width: 97%;
    float: right;
    .ant-table-tbody tr td > div {
      text-align: right;
      width: 90%;
    }
  }
  .ant-table-thead th {
    display: none;
  }
  .ant-table-tbody tr {
    background-color: #fbfbfb;
    border: 3px solid #ffffff;
    border-radius: 10px;
  }
  .ant-table-tbody tr td {
    padding: 9px 0px 9px 25px !important;
  }
  @media (max-width: 1285px) {
    .ant-table-tbody tr td {
      padding: 9px 0px !important;
    }
  }
  @media (max-width: 1000px) {
    .ant-table-tbody tr td {
      padding: 9px 0px !important;
      margin-left: 13px;
    }
  }
  @media (max-width: ${mobileWidth}) {
    display: none;
  }
`;
