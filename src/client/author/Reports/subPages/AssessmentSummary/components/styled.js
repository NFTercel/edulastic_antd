import styled from "styled-components";
import { Row } from "antd";
import { StyledTableData as TableData } from "../../../common/styled";
import { AssessmentStatisticTable } from "./table/assessmentStatisticTable";
import { fadedBlack, black } from "@edulastic/colors";
import { ControlDropDown } from "./table/controlDropDown";

export const UpperContainer = styled(Row)`
  .sub-container {
    .ant-card-body {
      height: 300px;
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
    height: 50px;
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

export const StyledTableData = styled(TableData)``;

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
