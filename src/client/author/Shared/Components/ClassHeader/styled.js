import { Popconfirm, Switch, Menu, Dropdown } from "antd";
import styled from "styled-components";
import { darkBlueSecondary, white } from "@edulastic/colors";
import { Link } from "react-router-dom";
import HeaderWrapper from "../../../src/mainContent/headerWrapper";
import { themes } from "../../../../student/themes";
import {} from "antd";

const classBoardTheme = themes.default.classboard;

export const Container = styled(HeaderWrapper)`
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  background-color: ${darkBlueSecondary};
  height: 62px;
  z-index: 1;
  padding: 0 2.5%;
`;

export const StyledTitle = styled.h1`
  color: ${white};
  font-size: 22px;
  font-weight: bold;
  margin: 20px 0;
  padding: 0;
`;

export const StyledLink = styled(Link)``;

export const StyledAssignName = styled.p`
  font-size: 1.3em;
  line-height: 1.3em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
`;

export const StyledParaFirst = styled.p`
  font-size: 0.9em;
  line-height: 1em;
`;

export const SpaceD = styled.div`
  display: inline-block;
  width: 10px;
`;

export const StyledParaSecond = styled.p`
  font-size: 13px;
  font-weight: 600;
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

export const StyledDiv = styled.div``;

export const StyledTabs = styled.div`
  width: 72%;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin: 0 10px;
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
  width: 100%;
  height: 100%;
  color: #fff;
  border: 0;
  font-size: 14px;
  border-radius: 0;
  outline: none;
  background: transparent;
  color: rgba(0, 0, 0, 0.65);
  margin: 0;
  padding: 0;
  cursor: pointer;
  text-align: left;
`;

export const StyledDropdown = styled(Dropdown)``;

export const StyledAnchorA = styled.a`
  width: 90px;
  height: 27px;
  background: transparent;
  color: #fff;
  border: 1px solid #45aaf3;
  font-size: 12px;
  border-radius: 3px;
  display: block;
  line-height: 25px;
  text-align: center;
  text-decoration: none !important;
`;
