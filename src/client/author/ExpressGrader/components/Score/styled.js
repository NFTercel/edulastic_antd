import styled from "styled-components";
import { Card, Table } from "antd";

export const StyledCard = styled(Card)`
  margin: 0px auto 60px auto;
  width: 95%;
  height: auto;
  background-color: transparent;
  .ant-card-body {
    padding: 0 !important;
  }
`;

export const TableData = styled(Table)`
  text-align: center;
  background-color: white;
  border-radius: 16px;
  box-shadow: 3px 3px 3px lightgray;
  .ant-table-thead > tr > th {
    text-align: center;
    font-size: 0.9em;
    font-weight: bold;
    color: #565e6d;
    background-color: #f6f9fd;
    border-right: 2px solid #f3f6f9;
    &:first-child {
      color: #75b39b;
    }
  }
  .ant-table-thead > tr {
    border-radius: 16px;
  }
  .ant-table-thead > tr > th {
    font-family: Open Sans;
    font-weight: 600;
  }
  .ant-table-thead > tr:first-child > th {
    background: #f5f9fe;
  }
  .ant-table-thead > tr:last-child > th {
    background: #fff;
    border-color: #f8f5f5;
  }
  .ant-table-thead > tr:last-child > th:first-child {
    color: #565e6d;
  }
  .ant-table-thead > tr > th:first-child {
    background: #f5f9fe !important;
    border-bottom: 2px solid #f3f6f9;
  }
  .ant-table-thead > tr > th:nth-child(2) {
    background: #f5f9fe;
  }
  .ant-table-tbody tr td {
    margin: 0px;
    border-radius: 5px;
    border: 2px solid #f3f6f9;
    font-family: Open Sans;
    font-weight: 600;
  }
`;

export const StyledDivFF = styled.div`
  color: #57b495;
  width: 72%;
  padding: 3px 0px;
  text-align: center;
  font-size: 0.9em;
  font-weight: 800;
  margin: auto;
`;

export const StyledDivColor = styled.span`
  color: #565e6d;
  width: 72%;
  padding: 3px 0px;
  text-align: center;
  font-size: 0.9em;
  font-weight: 800;
  margin: auto;
`;

export const StyledDivMid = styled.div`
  width: 80%;
  margin: 0px auto;
  font-size: 0.9em;
  color: #565e6d;
  text-align: center;
`;

export const StyledDivPartOne = styled.div`
  width:49.9%;
  display:inline-block
  font-weight:bold;
  border-right:0.1em solid #dcefe9;


`;

export const StyledDivPartTwo = styled.div`
  width:49.9%;
  display:inline-block
  color:#57b495;
  padding:3px 0px;
  text-align:right;
  font-size:1em;
  font-weight:800;
  margin:auto;
`;

export const StyledTitle = styled.div`
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
  background-color: #f6f9fd;
  color: #75b39b;
  font-variant: tabular-nums;
  line-height: 1.5;
`;
