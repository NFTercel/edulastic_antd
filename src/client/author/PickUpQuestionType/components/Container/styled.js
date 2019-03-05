import styled from "styled-components";
import {
  IconBarChart,
  IconEdit,
  IconLayout,
  IconLineChart,
  IconMath,
  IconMolecule,
  IconMore,
  IconNewList,
  IconSelection,
  IconTarget
} from "@edulastic/icons";
import { Icon } from "antd";
import { mobileWidth } from "@edulastic/colors";

export const Content = styled.div`
  display: flex;
  background: #f3f3f3;

  @media (max-width: ${mobileWidth}) {
    display: flex;
    & > div {
      &: nth-child(2) {
        transition: 0.3s;
        position: fixed;
        z-index: 999;
        min-width: 100vw;
        transform: ${props => (!props.showMobileView ? "translateX(-100vw)" : "translateX(0px)")};
      }
      &: last-child {
        min-width: 100vw;
        height: 100vh;
      }
    }
  }
`;

export const LeftSide = styled.div`
  height: 100vh;
  background-color: #fbfafc;

  .ant-menu-item:after {
    left: 0;
    right: auto;
    border-right: 3px solid #4aac8b;
  }

  .ant-menu-horizontal {
    padding-left: 26px;
    height: 62px;

    .ant-menu-item {
      height: 62px;
      font-size: 11px;
      padding-top: 15px;
      font-weight: 600;
      letter-spacing: 0.2px;
      color: #00b0ff;
      text-transform: uppercase;
    }
  }

  .ant-menu-horizontal > .ant-menu-item-selected {
    border-bottom: solid 2px #00b0ff;
  }

  .ant-menu-inline {
    margin-top: 18px;
  }

  .ant-menu-inline .ant-menu-item {
    font-size: 14px;
    font-weight: 600;
    color: #434b5d;
    display: flex;
    align-items: center;
    padding-left: 42px !important;
  }

  .ant-menu-inline .ant-menu-item-selected {
    color: #4aac8b;
    background: transparent !important;

    svg {
      fill: #4aac8b;
    }
  }

  .ant-menu-inline .ant-menu-item:not(:last-child) {
    margin-bottom: 18px;
  }
`;

export const RightSide = styled.div`
  position: relative;
  width: 100%;
`;

export const NewListIcon = styled(IconNewList)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const SelectionIcon = styled(IconSelection)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const LayoutIcon = styled(IconLayout)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const EditIcon = styled(IconEdit)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const MathIcon = styled(IconMath)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const MoleculeIcon = styled(IconMolecule)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const TargetIcon = styled(IconTarget)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const MoreIcon = styled(IconMore)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const LineChartIcon = styled(IconLineChart)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const BarChartIcon = styled(IconBarChart)`
  fill: #434b5d;
  width: 21px !important;
  height: 21px !important;
  margin-right: 13px;
`;

export const LineMobileIcon = styled(Icon)`
  display: none;
  position: fixed;
  left: 5px;
  top: 31px;
  z-index: 9999;
  font-size: 20px;

  @media (max-width: ${mobileWidth}) {
    display: block;
    transition: 0.6s;
    transform: ${props => (!props.showMobileView ? "rotate(0deg)" : "rotate(180deg)")};
  }
`;
