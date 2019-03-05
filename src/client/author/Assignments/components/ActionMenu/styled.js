import styled from "styled-components";
import { tabletWidth, mobileWidth } from "@edulastic/colors";
import { Menu } from "antd";

export const Container = styled.div`
  padding: 30;
  left: 0;
  right: 0;
  height: 100%;
`;

export const StyledMenu = styled(Menu)`
  border: 0px;
  @media (max-width: ${mobileWidth}) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media (max-width: ${tabletWidth}) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

export const StyledLink = styled.a`
  margin-top: 2px;
`;

export const SpaceElement = styled.div`
  display: inline-block;
  width: 10px;
`;
