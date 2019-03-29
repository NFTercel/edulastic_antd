import styled from "styled-components";
import { Card, Table, Tag } from "antd";
import { lightGrey, secondaryTextColor, white, greenDark, lightGreen, green } from "@edulastic/colors";

export const StyledCard = styled(Card)`
  margin: 0px auto 60px auto;
  width: 95%;
  height: auto;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  .ant-card-body {
    padding: 30px 24px 24px;
  }
`;

export const TableTitle = styled.div`
  color: #434b5d;
  font-size: 21px;
  line-height: 30px;
  font-weight: bold;
`;

export const TableData = styled(Table)`
  text-align: center;
  .ant-table td {
    white-space: nowrap;
  }
  .ant-table-thead > tr > th {
    background-color: white;
    text-align: center;
    font-size: 16px;
    line-height: 22px;
    color: #434b5d;
    font-weight: bold;
    /* padding: 16px 16px; */
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 13px 16px;
    border-bottom: 0px;
  }
  .ant-table-tbody > tr > td {
    background-color: #f8f8f8;
  }
  .ant-table-tbody > tr {
    border-bottom: 20px white solid;
    &:last-child {
      border-bottom: 0px;
    }
  }
  .ant-table-fixed {
    .ant-table-thead {
      tr {
        height: unset !important;
      }
    }
  }

  th.sub-thead-th {
    background-color: #f8f8f8 !important;
  }
  th.th-border-bottom {
    border-bottom: 20px white solid !important;
  }

  .ant-table-thead > tr > th .ant-table-column-sorters {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-table-thead > tr > th .ant-table-column-sorter {
    position: relative;
    top: 3px;
    left: 10px;
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
  width: 100px;
  font-size: 14px;
  color: #434b5d;
  font-weight: 600;
  text-align: center;
  img {
    margin-left: 18px;
  }
`;

export const StyledDivPartOne = styled.div`
  width: 49.9%;
  display: inline-block;
  font-weight: bold;
  border-right: 0.1em solid ${lightGreen};
`;

export const StyledDivPartTwo = styled.div`
  width: 49.9%;
  display: inline-block;
  color: ${greenDark};
  padding: 3px 0px;
  text-align: right;
  font-size: 1em;
  font-weight: 800;
  margin: auto;
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
  font-weight: 600;
  font-size: 14px;
  margin-right: 7px;
  color: ${props => props.color};
`;

const TitleText = styled.div`
  color: #aaafb5;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const StudentsTitle = styled(TitleText)``;
export const ScoreTitle = styled(TitleText)``;
