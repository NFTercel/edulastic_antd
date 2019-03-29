import styled from "styled-components";
import { Table, Card, Progress } from "antd";

import { darkBlueSecondary, white, tabletWidth } from "@edulastic/colors";
import { Link } from "react-router-dom";
import { FlexContainer } from "@edulastic/common";
import HeaderWrapper from "../../src/mainContent/headerWrapper";

export const StyledFlexContainer = styled(FlexContainer)`
  width: 95%;
  margin: 20px auto;
  align-items: flex-start;
`;

export const Anchor = styled.a`
  color: #69727e;
`;
export const AnchorLink = styled(Link)`
  color: #69727e;
`;

export const PaginationInfo = styled.span`
  font-weight: 600;
  display: inline-block;
  font-size: 11px;
  word-spacing: 5px;
  color: #69727e;
  font-family: Open Sans, SemiBold;
`;

export const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  .ant-card-body {
    padding: 30px 35px 30px 40px;
  }
`;

export const ReportTitle = styled.div`
  font-family: Open Sans, Bold;
  font-size: 22px;
  color: #434b5d;
  font-weight: 800;
  margin-bottom: 5px;
`;

export const DetailCard = styled(StyledCard)`
  width: 48%;
  .ant-card-body {
    padding: 0px;
  }
`;

export const DetailCardHeader = styled.div`
  background-color: #f8f8f8;
  padding: 38px 35px 30px 40px;
  border-radius: 10px 10px 0px 0px;
`;
export const DetailCardTitle = styled.div`
  color: #434b5d;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 29px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .anticon-close {
    cursor: pointer;
  }
`;
export const DetailCardSubTitle = styled.div`
  color: #434b5d;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 10px;
`;
export const DetailCardDesc = styled.div`
  color: #6a737f;
  font-size: 15px;
`;

export const DetailTable = styled(Table)`
  padding: 40px 25px 25px;
  .ant-table-thead > tr > th .ant-table-column-sorters {
    text-transform: uppercase;
    color: #aaafb5;
    font-size: 12px;
    font-weight: 800;
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

export const StudnetCell = styled.div`
  color: #434b5d;
  font-size: 14px;
  font-weight: 600;
`;

export const MasteryCell = styled.div`
  text-align: center;
  i {
    margin-left: 15px;
  }
`;

export const PerformanceScore = styled.span`
  color: #5eb500;
  font-size: 14px;
  font-weight: 600;
`;
export const PerformancePercent = styled.span`
  color: #434b5d;
  font-size: 14px;
  font-weight: 600;
  padding-left: 10px;
`;

export const Container = styled(HeaderWrapper)`
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  background-color: ${darkBlueSecondary};
  padding: 0px 15px;
  height: 62px;
  z-index: 1;
`;

export const StyledTitle = styled.h1`
  color: ${white};
  font-size: 22px;
  font-weight: bold;
  margin: 20px;
  padding: 0;
`;

export const StyledLink = styled(Link)`
  color: white;
  :hover {
    color: white;
  }
`;

export const StyledLinkActive = styled(Link)`
  color: black;
  :hover {
    color: black;
  }
`;

export const StyledParaFirst = styled.p`
  font-size: 0.9em;
`;

export const SpaceD = styled.div`
  display: inline-block;
  width: 10px;
`;

export const StyledParaSecond = styled.p`
  font-size: 0.5em;
`;

export const StyledDiv = styled.div`
  margin-right: 20px;
`;

export const StyledTabs = styled.div`
  width: 37%;
  height: 62px;
  display: flex;
`;

export const StyledAnchorA = styled.a`
  display: inline-block;
  font-size: 0.8em;
  font-weight: 600;
  color: white;
  padding: 3px 12px 15px 12px;
  width: 100%;
  text-align: center;
  background: #f4f3f3;
  margin: 6px 0;
  border-radius: 25px;
  margin-right: 15px;
`;

export const StyledAnchor = styled.a`
  display: inline-block;
  font-size: 0.8em;
  font-weight: 600;
  color: white;
  padding: 19px 12px;
  width: 100%;
  text-align: center;
  background: #3793dc;
  margin: 6px 0;
  border-radius: 25px;
  margin-right: 15px;
  white-space: nowrap;
  :hover {
    color: white;
  }
  @media (max-width: 1450px) {
    font-size: 0.6em;
  }
`;

export const MoreButton = styled.button`
  background: transparent;
  border: 1px solid #40a1ee;
  color: white;
  border-radius: 5px;
  height: 30px;
  padding: 0 10px;
  min-width: 100px;
`;

export const TableData = styled(Table)`
  width: 100%;
  text-align: center;
  .ant-table-thead > tr > th .ant-table-column-sorters {
    text-transform: uppercase;
    color: #aaafb5;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-table-thead > tr > th .ant-table-column-sorter {
    position: relative;
    top: 3px;
    left: 10px;
  }
  @media (max-width: 920px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 20px 0px;
    }
    .ant-table-thead > tr > th .ant-table-column-sorters {
      padding-left: 2px;
      padding-right: 0px;
    }
  }
  @media (max-width: 1000px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding-left: 2px;
    }
    .ant-table-thead > tr > th .ant-table-column-sorters {
      padding-left: 2px;
    }
  }
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters,
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters {
    text-align: center;
  }
  .ant-table-tbody {
    text-align: center;
  }
  .ant-table-tbody > tr > td {
    border-bottom: none;
  }
  @media (max-width: ${tabletWidth}) {
    display: none;
  }
  .ant-table-row-expand-icon {
    display: none;
  }
  @media (max-width: 1300px) and (min-width: 980px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      max-width: 100px;
    }
    .ant-table-thead > tr > th .ant-table-column-sorters {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
  @media (max-width: 1170px) {
    .ant-table-thead > tr > th {
      font-size: 10px;
    }
    .ant-table-tbody > tr > td {
      font-size: 9px;
    }
  }
  @media (max-width: 1170px) {
    .ant-table-thead > tr > th {
      font-size: 9px;
    }
    .ant-table-tbody > tr > td {
      font-size: 9px;
    }
  }
`;

export const DivWrapper = styled(StyledFlexContainer)`
  display: flex;
  align-items: flex-start;
`;

export const StandardsCell = styled.div`
  border-radius: 5px;
  border: 1px #4aac8b solid;
  background-color: rgba(31, 227, 161, 0.2);
  color: #4aac8b;
  font-size: 10px;
  font-weight: bold;
`;

export const QuestionCell = styled.div`
  color: #5eb500;
  font-size: 14px;
  font-weight: 600;
`;

export const MasterySummary = styled(Progress)`
  .ant-progress-inner {
    background-color: #e6e6e6;
    border-radius: 4px;
    height: 16px;
    .ant-progress-bg {
      height: 16px !important;
      border-radius: 4px 0px 0px 4px !important;
      background-color: #91d5dc;
    }
  }
  .ant-progress-outer {
    width: calc(100% - 30px);
  }
  .ant-progress-text {
    color: #434b5d;
    font-weight: 600;
    font-size: 14px;
    margin-left: 30px;
  }
`;

export const PerformanceSummary = styled.div`
  color: #434b5d;
  font-weight: 600;
  font-size: 14px;
`;
