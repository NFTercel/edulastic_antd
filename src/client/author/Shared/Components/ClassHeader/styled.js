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

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

export const StyledParaFirst = styled.p`
  /* font-size: 0.9em; */
`;

export const LinkLabel = styled.div`
  padding-left: 22px;
  padding-right: 15px;
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
  justify-content: flex-start;
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

export const StyledAnchor = styled.div`
  display: flex;
  font-size: 11px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  width: auto;
  padding: 0px 18px;
  text-align: center;
  height: 45px;
  margin: 0 10px;
  border-radius: 4px;
  background-color: ${props => (props.isActive ? "#5196F3" : "#277DF1")};
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;

  @media (max-width: 1450px) {
    font-size: 0.6em;
  }
  :hover {
    color: ${props => (props.isActive ? "#0288d1" : "#e5e5e5")};
    background-color: ${props => (props.isActive ? "#277DF1" : "#5196F3")};
    a {
      color: ${props => (props.isActive ? "#BED8FA" : "#FFFFFF")};
      svg {
        fill: ${props => (props.isActive ? "#BED8FA" : "#FFFFFF")};
      }
    }
  }
  a {
    color: ${props => (props.isActive ? "#FFFFFF" : "#BED8FA")};
  }
`;

export const Img = styled.img`
  width: 27px;
  height: 27px;
`;

export const StyledButton = styled.button`
  width: 31px;
  height: 45px;
  background: transparent;
  color: #fff;
  font-size: 12px;
  border: 0px;
  :hover {
    svg {
      fill: #bed8fa;
    }
  }
  :focus {
    outline: none;
  }
`;

export const MenuWrapper = styled.div`
  top: 46px;
  position: absolute;
  min-width: 90px;
  right: 10px;
`;
