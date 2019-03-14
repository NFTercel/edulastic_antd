import { Popconfirm, Switch } from "antd";
import styled from "styled-components";
import { darkBlueSecondary, white } from "@edulastic/colors";
import { Link } from "react-router-dom";
import HeaderWrapper from "../../../src/mainContent/headerWrapper";
import { themes } from "../../../../student/themes";

const classBoardTheme = themes.default.classboard;

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

export const StyledTitle = styled.h1`
  color: ${white};
  font-size: 22px;
  font-weight: bold;
  margin: 20px;
  padding: 0;
`;

export const StyledLink = styled(Link)``;

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
  background-color: ${classBoardTheme.SwitchColor};
`;

export const StyledDiv = styled.div`
  margin-right: 20px;
`;

export const StyledTabs = styled.div`
  width: 72%;
  height: 62px;
  display: flex;
  align-items: center;
`;

export const StyledAnchorA = styled.a`
  display: inline-block;
  font-size: 0.8em;
  font-weight: 600;
  color: ${white};
  padding: 17px 12px 15px 12px;
  width: auto;
  padding: 0px 15px;
  text-align: center;
  border-bottom: 4px solid lightgray;
  background-color: #3393dc;
`;

export const StyledAnchor = styled.a`
  display: flex;
  font-size: 0.8em;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  color: #e5e5e5;
  width: auto;
  padding: 0px 15px;
  text-align: center;
  height: 45px;
  margin: 0 7px;
  border-radius: 20px;
  background-color: ${props => (props.isActive ? "#f3f3f3" : "#0e93dc")};
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;

  @media (max-width: 1450px) {
    font-size: 0.6em;
  }
  :hover {
    color: ${props => (props.isActive ? "#0288d1" : "#e5e5e5")};
    background-color: ${props => (props.isActive ? "#f3f3f3" : "#f3f3f3")};
    a {
      color: ${props => (props.isActive ? "#0288d1" : "#434b5d")};
    }
  }
  a {
    color: ${props => (props.isActive ? "#434b5d" : "#e5e5e5")};
  }
`;

export const Img = styled.img`
  width: 27px;
  height: 27px;
`;

export const StyledButton = styled.button`
  width: 90px;
  height: 27px;
  background: transparent;
  color: #fff;
  border: 1px solid #45aaf3;
  font-size: 12px;
  border-radius: 3px;
`;
