import styled from "styled-components";
import { Row, Col, Button } from "antd";
import { StyledTable as Table, StyledCard as Card } from "../../../common/styled";
import { CustomTooltip } from "./customToolTip";
import { darkGrey, grey, lightBlue, black } from "@edulastic/colors";
import { Text } from "@vx/text";

export const StyledCard = Card;

export const StyledContainer = styled(Row)`
  flex-flow: column nowrap;

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

export const StyledTable = styled(Table)`
  .ant-table-body {
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

export const QuestionTypeHeading = styled.p`
  font-size: 20px;
  font-weight: 900;
`;

export const StyledAxisTickText = styled(Text)`
  font-size: 12px;
`;
