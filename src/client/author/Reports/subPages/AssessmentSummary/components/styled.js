import styled from "styled-components";
import { Row } from "antd";
import { StyledTable as Table, StyledCustomChartTooltip as CustomChartTooltip } from "../../../common/styled";
import { AssessmentStatisticTable } from "./table/assessmentStatisticTable";
import { fadedBlack, black } from "@edulastic/colors";
import { ControlDropDown } from "./table/controlDropDown";

export const UpperContainer = styled(Row)`
  .sub-container {
    .ant-card-body {
      min-height: 350px;
      display: flex;
      flex-direction: column;

      .recharts-responsive-container {
        flex: 1;
      }
    }
  }

  .district-statistics {
  }

  .chart-container {
  }
`;

export const TableContainer = styled(Row)``;

export const StyledAssessmentStatisticTable = styled(AssessmentStatisticTable)`
  .top-area {
    min-height: 50px;
    font-weight: 900;
    font-size: 14px;
    color: ${fadedBlack};
    align-content: center;

    .top-area-col {
      flex: 1 1 50%;
      .stats-grouped-by {
        text-transform: capitalize;
      }
    }

    .table-title {
      align-self: center;
    }

    .control-area {
      text-align: right;
    }
  }
`;

export const StyledTable = styled(Table)`
  .ant-table-body {
    table {
      thead {
        tr {
          th:first-child {
            min-width: 250px;
          }
          th:nth-child(n + 2) {
            text-align: right;
          }
        }
      }

      tbody {
        tr {
          td:nth-child(n + 2) {
            text-align: right;
          }
        }
      }
    }
  }
`;

export const StyledControlDropDown = styled(ControlDropDown)`
  button {
    white-space: pre-wrap;
    text-transform: capitalize;
  }
  .ant-dropdown-menu-item-disabled {
    font-weight: 900;
    color: ${black};
    cursor: default;
  }
`;

export const StyledCustomChartTooltip = styled(CustomChartTooltip)`
  min-width: 70px;
  min-height: auto;
`;
