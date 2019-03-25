import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 40px;
  min-height: 62px;
  position: ${props => props.position};
  z-index: ${props => props.zIndex};
  right: 101px;
  top: 13px;
  @media (max-width: ${mobileWidth}) {
    margin-top: 32px;
  }
`;

export const PreviewBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .ant-btn {
    background: transparent;
    height: 32px;
    padding: 0 11px;
    margin-left: 17px;
    border: 0;
    background: #fff;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);

    button {
      padding: 0;
      text-transform: initial;
      font-size: 12px;
    }
  }
`;

export const Button = styled.button`
  width: 136px;
  height: 45px;
  border-radius: 37px;
  background-color: #f3f3f3;
`;
