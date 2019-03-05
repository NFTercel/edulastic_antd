import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  position: ${props => props.position};
  z-index: ${props => props.zIndex};
  right: 120px;
  top: 0;
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
    height: 24px;
    margin-left: 17px;
  }
`;

export const Button = styled.button`
  width: 136px;
  height: 45px;
  border-radius: 37px;
  background-color: #f3f3f3;
`;
