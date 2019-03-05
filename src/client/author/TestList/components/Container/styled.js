import styled from "styled-components";
import { desktopWidth, textColor } from "@edulastic/colors";
import { Pagination, Affix } from "antd";
import { Card } from "@edulastic/common";

export const ScrollBox = styled.div`
  & > div {
    padding-top: 0px;
    padding-bottom: 5px;
    padding-right: 15px;
  }
`;

export const Container = styled.div`
  padding: 20px;
  left: 0;
  right: 0;
  height: 100%;
  overflow: auto;

  .ant-input {
    font-size: 13px;
    letter-spacing: 0.2px;
    color: #b1b1b1;
    ::placeholder {
      font-style: italic;
      color: #b1b1b1;
    }
  }

  .ant-input-suffix {
    font-size: 15px;
    svg {
      fill: #00b0ff;
    }
  }

  .scrollbar-container {
    overflow: auto !important;
    height: calc(100vh - 160px);

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ScrollbarWrapper = styled.div`
  margin-top: 15px;
`;

export const PaginationInfo = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

export const Filter = styled.div`
  width: 250px;
  z-index: 0;

  @media (max-width: 993px) {
    display: none;
  }
`;

export const CardContainer = styled(Card)`
  .ant-card-body {
    padding: ${props => (props.type !== "tile" ? "0" : "auto")};
  }
`;

export const MobileFilter = styled.div`
  height: 50px;
  margin-bottom: 15px;
  @media (min-width: 993px) {
    display: none;
  }

  @media (max-width: 993px) {
    display: flex;
    .ant-input-search {
      margin-right: 10px;
    }
  }
`;

export const Main = styled.div`
  flex: 1;
`;

export const FilterButton = styled.div`
  display: none;
  flex: 1;
  height: 50px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
  border-radius: 3px;

  .ant-btn {
    height: 50px;
    border-radius: 3px;
    width: 100%;

    span {
      font-size: 11px;
      font-weight: 600;
      color: ${textColor};
    }
  }

  @media (max-width: ${desktopWidth}) {
    display: block;
  }
`;

export const SearchModalContainer = styled.div`
  width: 100%;
`;

export const AffixWrapper = styled(Affix)`
  position: fixed;
  width: 250px;
  top: 85px;
  padding-right: 15px;
`;

export const PaginationWrapper = styled(Pagination)`
  padding: ${props => (props.type === "tile" ? "20px 0" : "24px 32px")};
`;
