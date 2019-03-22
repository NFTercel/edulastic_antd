import styled from "styled-components";
import { Row, Col, Button } from "antd";
import { StyledTableData as TableData, StyledCard as Card } from "../../../common/styled";
import { CustomTooltip } from "./customToolTip";
import { CustomChartTooltip } from "./charts/tooltip";
import { darkGrey, grey, lightBlue, black } from "@edulastic/colors";
import { Text } from "@vx/text";

export const StyledCard = Card;

export const StyledContainer = styled(Row)`
  flex-flow: column nowrap;
  // top: 95px;
  // position: relative;

  .question-area {
    min-height: 110px;
    padding: 10px;

    .question-container {
      flex: 1 1 300px;
      p {
        margin: 4px 0;
        color: ${darkGrey};
      }

      p:nth-child(1) {
        font-weight: 900;
      }

      p:nth-child(2) {
        font-size: 12px;
      }

      .answer-slider-percentage {
        flex: 0 0 50px;
        text-align: center;
        color: ${lightBlue};
      }

      .answer-slider {
        margin: 0 30px;
        flex: 1;
      }
    }
  }
`;

export const StyledTableData = styled(TableData)`
  .ant-table-body {
    // Till END css written to override text align, padding properties and to make Q# align left and correct % to align right
    .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters,
    .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters {
      text-align: left;
    }

    .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters:nth-child(n + 4),
    .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters:nth-child(n + 4) {
      text-align: right;
    }

    .ant-table-thead > tr > th .ant-table-column-sorters {
      padding: 5px;
    }

    .ant-table-thead > tr > th:nth-child(1) .ant-table-column-sorters .ant-table-column-sorter {
      display: inline-block;
      position: relative;
      right: unset;
      vertical-align: middle;
      margin-top: -4px;
    }

    .ant-table-thead > tr > th:nth-child(5) .ant-table-column-sorters .ant-table-column-sorter {
      right: 20px;
    }
    // END

    table {
      thead {
        tr {
          th:nth-child(n + 4) {
            text-align: right;
          }
        }
      }

      tbody {
        tr {
          td:nth-child(5) {
            padding: 0;

            .response-frequency-table-correct-td {
              padding: 0;
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              padding: 10px;
            }
          }

          td:nth-child(n + 4) {
            text-align: right;
          }
        }
      }
    }
  }
`;

export const StyledResponseTagContainer = styled(Col)`
  flex: 1 1 100px;
  .table-tag {
    border: solid 2px ${darkGrey};
    border-radius: 40px;
    margin: 2px 5px;
    text-align: center;
    padding: 3px 10px;
    min-width: 100px;
    p {
      margin: 2px;
    }
  }

  .table-tag-correct {
    border-color: #81a342;
  }

  .table-tag-warn {
    border-color: #d8ad38;
  }
`;

export const StyledSimpleBarChart = styled(StyledCard)`
  padding: 10px;
  overflow: hidden;

  .navigator-left {
    left: 5px;
    top: 50%;
  }

  .navigator-right {
    right: 5px;
    top: 50%;
  }

  .recharts-wrapper .recharts-cartesian-grid-horizontal line:first-child,
  .recharts-wrapper .recharts-cartesian-grid-horizontal line:last-child {
    stroke-opacity: 0;
  }
`;

export const StyledCustomTooltip = styled(CustomTooltip)`
  max-width: 500px;

  .ant-tooltip-content {
    .ant-tooltip-arrow {
      border-top-color: white;
    }
    .ant-tooltip-inner {
      background-color: white;
      color: ${black};

      .response-frequency-table-tooltip-value {
        font-weight: 900;
        margin-left: 5px;
      }
    }
  }
`;

export const StyledChartNavButton = styled(Button)`
  position: absolute;
  height: 50px;
  width: 50px;
  border: solid 1px #c0c0c0;
  border-radius: 25px;
  background-color: white;
  color: black;
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

export const QuestionTypeHeading = styled.p`
  font-size: 20px;
  font-weight: 900;
`;

export const StyledAxisTickText = styled(Text)`
  font-size: 12px;
`;
