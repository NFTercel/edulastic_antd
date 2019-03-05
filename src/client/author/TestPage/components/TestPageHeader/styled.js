import styled from "styled-components";
import { mainBlueColor, white, darkBlueSecondary, tabletWidth } from "@edulastic/colors";
import { IconShare } from "@edulastic/icons";
import { Icon } from "antd";

export const Container = styled.div`
  height: 104px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background: ${darkBlueSecondary};
  align-items: center;
`;

export const Title = styled.div`
  font-size: 22px;
  margin: 0;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${white};
`;

export const ShareIcon = styled(IconShare)`
  width: 16px;
  height: 16px;
  fill: ${mainBlueColor};
`;

export const MenuIcon = styled(Icon)`
  display: none;
  @media (max-width: ${tabletWidth}) {
    display: block;
    color: #fff;
    font-size: 20px;
    margin-right: 8px;
  }
`;

export const MenuIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
