import { green, mobileWidth } from "@edulastic/colors";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  padding: 40px 20px;
  min-height: 200px;
  flex-direction: column;
  opacity: ${({ isDragging }) => (isDragging ? "0.4" : "1")};

  @media (max-width: ${mobileWidth}) {
    padding: 20px;
  }
`;

export const Buttons = styled.div`
  position: absolute;
  right: -40px;
  top: 40px;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .ant-btn-circle {
    background: ${green};
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
    margin-bottom: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${mobileWidth}) {
    right: 0px;
  }
`;
