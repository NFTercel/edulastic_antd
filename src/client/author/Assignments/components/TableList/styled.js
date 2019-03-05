import { mobileWidth, tabletWidth } from "@edulastic/colors";
import styled from "styled-components";
import { Table, Button } from "antd";

export const Container = styled.div`
  padding: 30;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;

export const Icon = styled.img`
  @media (max-width: 1300px) {
    width: 18px;
    height: 18px;
  }
  @media (max-width: 920px) {
    width: 15px;
    height: 15px;
  }
  @media (max-width: 920px) {
    width: 15px;
    height: 15px;
  }
  @media (max-width: 920px) {
    width: 15px;
    height: 15px;
  }
`;

export const TableData = styled(Table)`
  text-align: center;
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

export const BtnGreen = styled(Button)`
  background-color: #1cd6dc !important;
  border: 0px;
  width: 55px;
  margin-right: 15px;
`;

export const AssignmentTD = styled.div`
  text-align: left;
  padding-left: 0px !important;
  padding-right: 0px !important;
`;

export const IconArrowDown = styled.img`
  color: #12a6e8;
  margin-right: 5px;
  width: 6px;
`;

export const BtnAction = styled(Button)`
  color: #12a6e8;
  border-color: #12a6e8;
  max-width: 140px;
  height: 32px;
  font-size: 0.7em;
  font-weight: bold;
  width: 100%;
  padding: 0px 20px;
  text-align: center;
  :active {
    background-color: #12a6e8;
    color: #fff;
  }
  :hover {
    background-color: #12a6e8;
    color: #fff;
  }
  @media (max-width: 1300px) {
    padding: 10px;
  }
`;

export const AssignedImg = styled.img`
  color: #12a6e8;
`;

export const ExpandDivdier = styled.div`
  color: #12a6e8;
  cursor: pointer;
`;

export const BtnProgress = styled(Button)`
  color: #d1a422;
  background-color: #deba5b;
  border: 0px;
  font-size: 0.7em;
  font-weight: bold;
  max-width: 145px;
  width: 100%;
  padding: 0px 20px;
  height: 26px;
  border-radius: 8px;
`;

export const BtnSubmitted = styled(Button)`
  color: #8750ac;
  background-color: #e7c8fb;
  border: 0px;
  font-size: 0.7em;
  font-weight: bold;
  max-width: 145px;
  width: 100%;
  padding: 0px 20px;
  height: 26px;
  border-radius: 8px;
`;

export const BtnStarted = styled(Button)`
  color: #0686c0;
  background-color: #c8ebfb;
  border: 1px solid #eaf3f6;
  font-size: 0.7em;
  width: 100%;
  font-weight: bold;
  max-width: 145px;
  height: 26px;
  border-radius: 8px;
  padding: 0px 20px;
`;

export const ActionDiv = styled.div`
  text-align: center;
  flex: 1;
`;

export const GreyFont = styled.div`
  color: grey;
  font-size: 12px;
  @media (max-width: 1170px) {
    font-size: 9px;
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
