import styled from "styled-components";
import { white, green, newBlue } from "@edulastic/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;

  .ant-menu-item {
    height: 62px;
    display: flex;
  }

  .ant-btn {
    height: 40px;
    width: 100px;
    border-radius: 4px;
    background-color: ${green};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 11px;
      font-weight: 600;
      color: ${white};
      letter-spacing: 0.2px;
    }
  }

  .ant-menu-horizontal {
    background: transparent;
    border-bottom: none;
    display: flex;
    flex: 1;
  }

  .ant-menu-item {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #e5e5e5;
    padding-top: 7px;
  }

  .ant-menu-item-active {
    letter-spacing: 0.2px !important;
    font-weight: 600 !important;
    color: ${white} !important;
    border-bottom: solid 4px #c9c9c9 !important;
  }

  .ant-menu-horizontal > .ant-menu-item-selected {
    background: #057fc1;
    border-bottom: solid 4px #c9c9c9;
    letter-spacing: 0.2px;
    font-weight: 600;
    color: ${white};
  }
`;

export const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MobileFirstContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 17px;

  .ant-btn {
    background: transparent;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 10px;

    &:hover {
      background: #1fe3a1;
    }
  }
`;

export const MobileSecondContainer = styled.div`
  display: none;
  justify-content: space-between;
  text-align: left;
  margin-bottom: 10px;
`;

export const PreviewBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .ant-btn {
    background: transparent;
    height: 24px;
    margin-left: 17px;
  }
`;

export const StyledButton = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const HeadIcon = styled.div`
  margin-top: 4px;
  margin-right: 10px;
`;

export const RightSide = styled.div`
  .ant-btn {
    width: 86px;
    background: #fff;

    span {
      color: ${newBlue};
    }
  }
`;

export const MenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: initial;
  padding: 0 15px;
  height: 45px;
  border-radius: 4px;
  border: none;
  background-color: #277df1;
  margin-right: 12px;
  font-size: 13px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: 0.2px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);

  &:last-of-type {
    margin-right: 0;
  }

  svg {
    fill: rgba(255, 255, 255, 0.7);
  }

  &.active {
    color: #fff;
    background-color: #5196f3;

    svg {
      fill: #fff;
    }
  }
`;
