import styled from "styled-components";
import { Card, Table, Progress } from "antd";

export const StyledCard = styled(Card)`
  margin: 0px auto 60px auto;
  width: 95%;
  height: auto;
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
`;

export const TableData = styled(Table)`
  text-align: center;
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters,
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters {
    text-align: center;
    font-size: 0.9em;
    font-weight: bold;
    color: #565e6d;
  }
  .ant-table-tbody tr td {
    border: 1px solid #f8f5f5;
    margin: 10px;
    border-radius: 5px;
  }
`;

export const StyledDivF = styled.div`
  background-color: #d2f9eb;
  color: #57b495;
  width: 72%;
  padding: 3px 0px;
  border: 0.1em solid #dcefe9;
  border-radius: 5px;
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  margin: auto;
`;

export const StyledParaF = styled.div`
  color: #57b495;
  text-align: center;
`;

export const StyledParaS = styled.div`
  color: #565e6d;
  text-align: center;
  font-size: 0.9em;
`;

export const StyledProgress = styled(Progress)`
  width: 80%;
  margin: 0px auto;
  font-size: 0.9em;
  color: #565e6d;
`;
