import styled from "styled-components";
import { Table } from "antd";

import { darkBlueSecondary, white, black, tabletWidth } from "@edulastic/colors";
import { Link } from "react-router-dom";
import HeaderWrapper from "../../src/mainContent/headerWrapper";

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
  text-align: center;
  .ant-table-thead > tr > th .ant-table-column-sorters {
    padding-left: 20px;
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
