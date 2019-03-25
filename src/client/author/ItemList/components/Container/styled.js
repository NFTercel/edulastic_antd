import {
  desktopWidth,
  greenDark,
  mobileWidth,
  secondaryTextColor,
  tabletWidth,
  white,
  newBlue
} from "@edulastic/colors";
import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: auto;
  display: flex;
  position: relative;

  @media (max-width: ${desktopWidth}) {
    flex-direction: column;
  }

  @media (max-width: ${mobileWidth}) {
    padding: 0 0 40px 0;
  }
`;

export const ListItems = styled.div`
  flex: 1;

  @media (max-width: ${mobileWidth}) {
    padding: 20px;
  }

  .ant-pagination {
    display: flex;
    @media (max-width: ${tabletWidth}) {
      justify-content: flex-end;
      padding: 0 20px 20px !important;
      margin: -10px 0 0 0;
      width: 100%;
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
`;

export const Element = styled.div`
  margin: 0;

  .ant-pagination {
    padding: 0 76px 40px;
    background: ${white};
    justify-content: flex-end;

    &-next a,
    &-prev a {
      border: 0;
    }
    &-prev,
    &-next,
    &-disabled,
    &-disabled:hover,
    &-disabled:focus {
      border-radius: 4px;
      box-shadow: 0 2px 7px 0 rgba(201, 208, 219, 0.5);
      border: 0;
    }
    &-jump-next,
    &-item {
      font-size: 13px;
      font-weight: 600;
      color: ${secondaryTextColor};
      border-radius: 4px;
      box-shadow: 0 2px 7px 0 rgba(201, 208, 219, 0.5);
      border: 0;

      &-active {
        font-size: 13px;
        font-weight: 600;
        opacity: 1;
        background: ${newBlue};
      }
    }
  }
  .ant-pagination-total-text {
    display: none;
  }
  @media (max-width: ${mobileWidth}) {
    margin: 20px 0px;
  }
`;
