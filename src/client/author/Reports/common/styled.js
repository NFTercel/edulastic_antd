import styled from "styled-components";
import { Card } from "@edulastic/common";
import { Row, Col, Button } from "antd";
import { Table } from "antd";
import { CustomChartTooltip } from "./components/tooltip";
import { darkGrey, grey, fadedBlack, fadedGrey } from "@edulastic/colors";

export const StyledCard = styled(Card)`
  margin: 10px;
`;

export const StyledContainer = styled(Row)`
  //   flex-flow: row wrap;

  .report-category {
    flex: 50%;
    max-width: 50%;
  }

  @media (max-width: 600px) {
    .report-category {
      flex: 100%;
      max-width: 100%;
    }
  }
`;

export const StyledTable = styled(Table)`
  .ant-table-body {
    overflow: auto;
    table {
      thead {
        tr {
          th {
            padding: 10px;
            text-align: left;
            font-weight: 900;
          }
        }
      }

      tbody {
        tr {
          border-bottom: solid 1px ${fadedGrey};
          td {
            height: 50px;
            padding: 10px;
            text-align: left;
          }
        }
      }
    }
  }

  .ant-table-body::-webkit-scrollbar {
    height: 10px;
  }

  .ant-table-body::-webkit-scrollbar-track {
    background: ${grey};
  }

  .ant-table-body::-webkit-scrollbar-thumb {
    background: ${darkGrey};
  }

  .ant-pagination.ant-table-pagination {
    .ant-pagination-disabled {
      display: none;
    }
  }
`;

export const StyledH3 = styled.h3`
  font-weight: 900;
  color: ${fadedBlack};
  margin: 0;
`;

export const StyledCustomChartTooltip = styled(CustomChartTooltip)`
  min-width: 200px;
  max-width: 600px;
  min-height: 75px;
  background-color: #f0f0f0;
  color: black;
  border: solid 1px #bebebe;
  box-shadow: 0 0 20px #c0c0c0;
  padding: 5px;
  font-size: 12px;
  font-weight: 600;
  white-space: pre;
`;

export const Capitalized = styled.span`
  text-transform: capitalize;
`;
