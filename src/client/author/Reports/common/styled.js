import styled from "styled-components";
import { Card } from "@edulastic/common";
import { Row, Col, Button } from "antd";
import { TableData } from "../../styled/table";
import { darkGrey, grey, fadedBlack } from "@edulastic/colors";

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

export const StyledTableData = styled(TableData)`
  .ant-table-body {
    table {
      thead {
        tr {
          th {
            padding: 5px;
            text-align: left;
          }
        }
      }

      tbody {
        tr {
          td {
            height: 50px;
            padding: 5px;
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
