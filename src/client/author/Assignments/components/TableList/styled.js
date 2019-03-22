import styled from "styled-components";
import { Table, Button } from "antd";

import { IconChevronLeft } from "@edulastic/icons";

import {
  mobileWidth,
  tabletWidth,
  red,
  darkGrey,
  lightBlueSecondary,
  lightGreySecondary,
  white,
  green
} from "@edulastic/colors";

export const Container = styled.div`
  padding: 30;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;

export const Icon = styled.img`
  @media (max-width: 1300px) {
    width: 18px;
    height: 18px;
  }
  @media (max-width: 920px) {
    width: 15px;
    height: 15px;
  }
`;

export const TableData = styled(Table)`
  text-align: center;

  .ant-table-thead > tr > th .ant-table-column-sorter {
    position: relative;
    margin-left: 20px;
  }

  .ant-table-thead > tr {
    th {
      .ant-table-column-sorters {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:first-child {
        .ant-table-column-sorters {
          justify-content: flex-start;
          padding-left: 26px;
        }
      }
    }
  }

  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters {
    padding-right: 0 !important;
  }

  .ant-table-thead th {
    border-bottom: none;

    &:hover {
      background: transparent !important;
    }
  }

  tr.ant-table-expanded-row,
  tr.ant-table-expanded-row:hover {
    background: transparent;
  }

  tr.ant-table-expanded-row td > .ant-table-wrapper {
    margin: 0;
  }

  .ant-table-thead > tr > th {
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    color: ${darkGrey};
    white-space: nowrap;
    padding: 0 !important;
    padding-bottom: 34px !important;
  }

  .ant-table-thead > tr > th > .ant-table-column-has-actions > .ant-table-column-sorters {
    padding: 0;
  }

  .ant-table-tbody {
    .ant-table-expanded-row td {
      padding-left: 0 !important;
      padding-top: 0;
      padding-bottom: 0;
    }

    tr {
    }

    td {
      padding: 8px 0;
      font-weight: 600;

      &:first-child {
        padding-left: 26px;
      }
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

  .ant-table-thead > tr > th {
    background: transparent;
  }

  .ant-pagination {
    margin-bottom: 0;

    &-item {
      box-shadow: 0px 2px 8px 1px rgba(163, 160, 160, 0.2);
      border: none;
      background: ${white};
      line-height: 35px;

      &-link {
        border: none;
      }

      &-active {
        background: ${lightBlueSecondary};
        box-shadow: none;

        a {
          color: ${white};
        }
      }
    }

    &-prev,
    &-next {
      box-shadow: 0px 2px 8px 1px rgba(163, 160, 160, 0.2);
    }

    &-jump {
      &-next,
      &-prev {
        min-width: 33px;
        height: 33px;
        background: ${white};
        box-shadow: 0px 2px 8px 1px rgba(163, 160, 160, 0.2);
        line-height: 35px;
      }
    }
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

export const BtnGreen = styled(Button)`
  background-color: #1cd6dc !important;
  border: 0px;
  width: 71px;
  height: 23px;
  margin-right: 9px;
`;

export const AssignmentTD = styled.div`
  text-align: left;
  padding-left: 0px !important;
  padding-right: 0px !important;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconArrowDown = styled.img`
  color: #12a6e8;
  margin-right: 5px;
  width: 6px;
`;

export const BtnAction = styled(Button)`
  color: ${lightBlueSecondary};
  border: none;
  box-shadow: 0px 2px 4px 0 rgba(201, 208, 219, 0.5);
  max-width: 140px;
  height: 28px;
  font-size: 0.7em;
  font-weight: 600;
  width: 100%;
  padding: 0px 20px;
  text-align: center;
  width: 90px;

  :active {
    background-color: ${lightBlueSecondary};
    color: #fff;
  }

  :hover {
    background-color: ${lightBlueSecondary};
    color: #fff;
  }
`;

export const AssignedImg = styled.img`
  color: #12a6e8;
`;

export const TypeIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  max-width: 18px;
  background: ${props => (props.type === "practice" ? red : "#5EB500")};
  text-align: center;
  color: ${white};
  border-radius: 50%;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-left: 1px;
`;

export const ExpandDivdier = styled.div`
  color: #12a6e8;
  cursor: pointer;
`;

export const BtnProgress = styled(Button)`
  color: #d1a422;
  background-color: #deba5b;
  border: 0px;
  font-size: 0.7em;
  font-weight: bold;
  max-width: 145px;
  width: 100%;
  padding: 0px 20px;
  height: 26px;
  border-radius: 8px;
`;

export const BtnSubmitted = styled(Button)`
  color: #8750ac;
  background-color: #e7c8fb;
  border: 0px;
  font-size: 0.7em;
  font-weight: bold;
  max-width: 145px;
  width: 100%;
  padding: 0px 20px;
  height: 26px;
  border-radius: 8px;
`;

export const BtnStarted = styled(Button)`
  color: #0686c0;
  background-color: #c8ebfb;
  border: 1px solid #eaf3f6;
  font-size: 0.7em;
  width: 100%;
  font-weight: bold;
  max-width: 145px;
  height: 26px;
  border-radius: 8px;
  padding: 0px 20px;
`;

export const ActionDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  flex: 1;
  padding-right: 7px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  padding: 0;
  width: 110px;
`;

export const GreyFont = styled.span`
  color: grey;
  font-size: 14px;
`;

export const ExpandedTable = styled(Table)`
  @media (max-width: 980px) {
    margin-left: 13px;
    width: 97%;
    float: right;
    .ant-table-tbody tr td > div {
      text-align: right;
      width: 90%;
    }
  }

  .ant-table-thead th {
    display: none;
  }

  .ant-table-tbody tr {
    background-color: ${lightGreySecondary};
  }

  .ant-table-tbody tr td {
    padding: 9px 0px 9px 25px !important;
  }

  @media (max-width: ${mobileWidth}) {
    display: none;
  }
`;

export const IconExpand = styled(IconChevronLeft)`
  height: 12px;
  transform: rotate(-90deg);
  margin: 0 16px 0 12px;
  cursor: pointer;
  fill: ${lightBlueSecondary};
`;
