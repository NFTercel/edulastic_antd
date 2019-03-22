import styled from "styled-components";
import { Pagination } from "antd";

import { white, lightBlueSecondary } from "@edulastic/colors";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: calc(100% + 52px);
  overflow: hidden;
  padding-bottom: 63px;
  margin-left: -26px;
`;

export const MobilePaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MobilePagination = styled(Pagination)`
  .ant-pagination-item {
    box-shadow: 0px 2px 8px 1px rgba(163, 160, 160, 0.2);
    border: none;
    background: ${white};
    line-height: 33px;
    font-size: 15px;
    font-weight: 500;
    color: #4d4f5c;

    &:hover,
    &:focus {
      color: #4d4f5c;
    }

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

  .ant-pagination-prev,
  .ant-pagination-next {
    box-shadow: 0px 2px 8px 1px rgba(163, 160, 160, 0.2);
  }

  .ant-pagination-jump {
    &-next,
    &-prev {
      min-width: 33px;
      height: 33px;
      background: ${white};
      box-shadow: 0px 2px 8px 1px rgba(163, 160, 160, 0.2);
      line-height: 35px;
    }
  }
`;
