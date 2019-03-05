import { darkBlueSecondary, white } from "@edulastic/colors";
import styled from "styled-components";
import { Popconfirm, Switch } from "antd";
import { Link } from "react-router-dom";
import HeaderWrapper from "../../../src/mainContent/headerWrapper";

export const Container = styled(HeaderWrapper)`
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  background-color: ${darkBlueSecondary};
  padding: 0px 15px;
  height: 62px;
  z-index: 1;
`;
// const HeaderWrapper = styled.div`
//   padding-top: 62px;
//   margin-bottom: 10px;
// `;
export const StyledTitle = styled.h1`
  color: ${white};
  font-size: 22px;
  font-weight: bold;
  margin: 20px;
  padding: 0;
`;

export const StyledLink = styled(Link)`
  color: white;
  :hover {
    color: white;
  }
`;

export const StyledParaFirst = styled.p`
  font-size: 0.9em;
`;

export const SpaceD = styled.div`
  display: inline-block;
  width: 10px;
`;

export const StyledParaSecond = styled.p`
  font-size: 0.5em;
`;

export const StyledParaThird = styled.p`
  font-size: 0.83em;
  display: inline-block;
  color: white;
  margin-right: 30px;
  color: ${white};
  font-weight: bold;
`;

export const StyledPopconfirm = styled(Popconfirm)``;

export const StyledSwitch = styled(Switch)`
  background-color: #1fe3a0;
`;

export const StyledDiv = styled.div`
  margin-right: 20px;
`;

export const StyledTabs = styled.div`
  width: 43%;
  height: 62px;
  display: flex;
`;

export const StyledAnchorA = styled.a`
  display: inline-block;
  font-size: 0.7em;
  color: white;
  padding: 17px 12px 15px 12px;
  width: 100%;
  text-align: center;
  border-bottom: 4px solid lightgray;
  background-color: #037fc2;
  :hover {
    color: white;
  }
`;

export const StyledAnchor = styled.a`
  display: inline-block;
  font-size: 0.7em;
  color: white;
  padding: 19px 12px;
  width: 100%;
  text-align: center;
  :hover {
    color: white;
  }
  @media (max-width: 1450px) {
    font-size: 0.6em;
  }
`;
