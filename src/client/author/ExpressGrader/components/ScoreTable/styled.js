import styled from "styled-components";
import { Card, Table, Tag } from "antd";
import { lightGrey, secondaryTextColor, white, greenDark, lightGreen, green } from "@edulastic/colors";

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
  background-color: ${white};
  border-radius: 16px;
  box-shadow: 3px 3px 3px lightgray;
  .ant-table-thead > tr > th {
    text-align: center;
    font-size: 0.9em;
    font-weight: bold;
    color: ${lightGreen};
    background-color: ${lightGreen};
    border-right: 2px solid ${lightGrey};
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
    background: ${lightGreen};
  }
  .ant-table-thead > tr:last-child > th {
    background: #fff;
    border-color: ${lightGrey};
  }
  .ant-table-thead > tr:last-child > th:first-child {
    color: ${secondaryTextColor};
  }
  .ant-table-thead > tr > th:first-child {
    background: ${lightGreen} !important;
    border-bottom: 2px solid ${lightGrey};
  }
  .ant-table-thead > tr > th:nth-child(2) {
    background: ${lightGreen};
    color: ${secondaryTextColor};
  }
  .ant-table-tbody tr td {
    margin: 0px;
    border-radius: 5px;
    border: 2px solid ${lightGrey};
    font-family: Open Sans;
    font-weight: 600;
  }
`;

export const StyledDivFF = styled.div`
  color: ${greenDark};
  width: 72%;
  padding: 3px 0px;
  text-align: center;
  font-size: 0.9em;
  font-weight: 800;
  margin: auto;
`;

export const StyledDivColor = styled.span`
  color: ${secondaryTextColor};
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
  color: ${secondaryTextColor};
  text-align: center;
`;

export const StyledDivPartOne = styled.div`
  width:49.9%;
  display:inline-block
  font-weight:bold;
  border-right:0.1em solid ${lightGreen};
`;

export const StyledDivPartTwo = styled.div`
  width:49.9%;
  display:inline-block
  color:${greenDark};
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
  color: ${greenDark};
  font-variant: tabular-nums;
  line-height: 1.5;
`;

export const StyledTag = styled(Tag)`
  background: ${green}33;
  margin: 1px 0;
  border: 0;
`;

export const StyledText = styled.span`
  font-family: Open Sans;
  color: ${props => props.color};
`;
