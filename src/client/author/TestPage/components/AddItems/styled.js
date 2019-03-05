import styled from "styled-components";
import { desktopWidth, greenDark, mobileWidth, secondaryTextColor, tabletWidth, white } from "@edulastic/colors";
import { Select } from "antd/lib/index";
import { EduButton } from "../../../../../../packages/common";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 51px;
  padding-left: 20px
  position: relative;

  @media (max-width: ${mobileWidth}) {
    padding-bottom: 40px;
    padding-left: 0px;
  }
`;

export const TopMenu = styled.div`
  margin: 24px 45px 0px 45px;
`;

export const MainList = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: ${desktopWidth}) {
    display: block;
  }
`;

export const ListItems = styled.div`
  flex: 1;
  margin: 29px 40px 0px 29px;

  @media (min-width: 993px) {
    width: 200px;
  }

  .ant-pagination {
    display: flex;

    @media (max-width: ${tabletWidth}) {
      justify-content: flex-end;
      margin-left: 29px !important;
      margin-top: 80px !important;
    }
  }

  .ant-pagination-total-text {
    flex: 1;
    font-size: 13px;
    font-weight: 600;
    font-family: "Open Sans";
    color: ${secondaryTextColor};
    letter-spacing: normal;
  }

  .ant-pagination-item-active {
    border: none;
    opacity: 0.75;
    background-color: ${greenDark};
  }

  .ant-pagination-item-active a {
    color: ${white};
  }

  @media (max-width: ${mobileWidth}) {
    margin: 21px 26px 0px 26px;
  }
`;

export const ItemsTableContainer = styled.div`
  margin: 14px 0px;
`;

export const StyledButton = styled(EduButton)`
  height: 32px;
  font-size: 11px;
  margin-right: 15px;
  text-transform: uppercase;

  :last-child {
    margin-right: 0;
  }
`;

export const StyledSelect = styled(Select)`
  height: 32px;

  .ant-select-selection--single {
    height: 32px;
  }

  .ant-select-selection__rendered {
    height: 32px;
  }

  .ant-select-selection-selected-value {
    height: 32px;
    display: flex !important;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: ${secondaryTextColor};
  }

  .ant-select-arrow-icon {
    svg {
      fill: #00b0ff;
    }
  }
`;
