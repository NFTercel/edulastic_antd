import { desktopWidth, greenDark, mobileWidth, secondaryTextColor, tabletWidth, white } from "@edulastic/colors";
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
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
      margin-left: 29px !important;
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
  margin: 14px 0px;

  @media (max-width: ${mobileWidth}) {
    margin: 20px 0px;
  }
`;
