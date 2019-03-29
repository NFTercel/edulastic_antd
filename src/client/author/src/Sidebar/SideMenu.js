import React, { Component } from "react";
import { compose } from "redux";
import { get } from "lodash";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout, Menu as AntMenu, Row, Col, Dropdown, Icon as AntIcon } from "antd";
import styled from "styled-components";
import {
  IconHeader,
  IconLogoCompact,
  IconClockDashboard,
  IconAssignment,
  IconBarChart,
  IconManage,
  IconQuestion,
  IconItemList,
  IconTestList,
  IconCurriculumSequence
} from "@edulastic/icons";
import { withWindowSizes } from "@edulastic/common";
import { logoutAction } from "../actions/auth";
import { toggleSideBarAction } from "../actions/togglemenu";
import Profile from "../assets/Profile.png";

const menuItems = [
  {
    label: "Dashboard",
    icon: IconClockDashboard
  },
  {
    label: "Curriculum Sequence",
    icon: IconCurriculumSequence,
    path: "author/curriculum-sequence"
  },
  {
    label: "Assignments",
    icon: IconAssignment,
    path: "author/assignments"
  },
  {
    label: "Report",
    icon: IconBarChart,
    path: "author/reports"
  },
  {
    label: "Manage Class",
    icon: IconManage,
    path: "author/manageClass"
  },
  {
    label: "Item List",
    icon: IconItemList,
    path: "author/items"
  },
  {
    label: "Test List",
    icon: IconTestList,
    path: "author/tests"
  }
];

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  renderIcon = (icon, isSidebarCollapsed) => styled(icon)`
    width: 22px;
    height: 22px;
    fill: rgb(67, 75, 93);
    margin-right: ${() => (isSidebarCollapsed ? "0rem" : "1rem")};

    .ant-menu-item-active > & {
      fill: #1890ff;
    }
    .ant-menu-item-selected > & {
      fill: #4aac8b;
    }
  `;

  handleMenu = item => {
    const { history } = this.props;
    if (menuItems[item.key].path !== undefined) {
      history.push(`/${menuItems[item.key].path}`);
    }
  };

  toggleMenu = () => {
    const { toggleSideBar } = this.props;
    toggleSideBar();
  };

  handleVisibleChange = flag => {
    this.setState({ isVisible: flag });
  };

  toggleDropdown = () => {
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  };

  render() {
    const { broken, isVisible } = this.state;
    const { windowWidth, history, isSidebarCollapsed, firstName, logout } = this.props;
    const isPickQuestion = !!history.location.pathname.includes("pickup-questiontype");

    const isCollapsed = isPickQuestion || isSidebarCollapsed;
    const isMobile = windowWidth < 770;

    const footerDropdownMenu = (
      <FooterDropDown isVisible={isVisible}>
        <Menu>
          <Menu.Item key="0" className="removeSelectedBorder">
            <a onClick={logout}>
              <LogoutIcon type="logout" /> {isCollapsed ? "" : "SIGN OUT"}
            </a>
          </Menu.Item>
          <Menu.Item key="1" className="removeSelectedBorder">
            <Link to="/home/profile">
              <IconDropdown type="user" /> {isCollapsed ? "" : "MY PROFILE"}
            </Link>
          </Menu.Item>
        </Menu>
      </FooterDropDown>
    );
    return (
      <FixedSidebar>
        <SideBar
          collapsed={isCollapsed}
          collapsible
          breakpoint="md"
          onBreakpoint={brokenStatus => this.setState({ broken: brokenStatus })}
          width={isMobile ? windowWidth : "240"}
          collapsedWidth={broken ? "0" : "100"}
          theme="light"
          className="sideBarwrapper"
        >
          <LogoWrapper className="logoWrapper">
            {broken ? (
              <Col span={3}>
                <AntIcon className="mobileCloseIcon" type="close" theme="outlined" onClick={this.toggleMenu} />
              </Col>
            ) : null}
            <Col span={18} style={{ textAlign: "left" }}>
              {isCollapsed ? <LogoCompact /> : <Logo />}
            </Col>
            {broken ? null : (
              <Col span={6} style={{ textAlign: "right", color: "#1fe3a1" }}>
                {!isPickQuestion && (
                  <AntIcon className="trigger" type={isCollapsed ? "right" : "left"} onClick={this.toggleMenu} />
                )}
              </Col>
            )}
          </LogoWrapper>
          <LogoDash />
          <MenuWrapper>
            <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline" onClick={item => this.handleMenu(item)}>
              {menuItems.map((menu, index) => {
                const MenuIcon = this.renderIcon(menu.icon, isCollapsed);
                return (
                  <MenuItem key={index.toString()}>
                    <MenuIcon />
                    {!isCollapsed && <span>{menu.label}</span>}
                  </MenuItem>
                );
              })}
            </Menu>
            <MenuFooter className="footerBottom">
              {!isCollapsed && (
                <QuestionButton className="questionBtn">
                  <HelpIcon />
                  {isCollapsed ? null : <span>Help Center</span>}
                </QuestionButton>
              )}
              {!isCollapsed && (
                <UserInfoButton isVisible={isVisible} isCollapsed={isCollapsed} className="userinfoBtn">
                  <Dropdown
                    onClick={this.toggleDropdown}
                    overlayStyle={{ position: "fixed", minWidth: "198px" }}
                    className="footerDropdown"
                    overlay={footerDropdownMenu}
                    trigger={["click"]}
                    placement="topCenter"
                    isVisible={isVisible}
                    onVisibleChange={this.handleVisibleChange}
                  >
                    <div>
                      <img src={Profile} alt="Profile" />
                      <div style={{ paddingLeft: 11 }}>
                        {!isCollapsed && <UserName>{firstName || "Zack Oliver"}</UserName>}
                        {!isCollapsed && <UserType>Teacher</UserType>}
                      </div>
                      {!isCollapsed && (
                        <IconDropdown
                          style={{ fontSize: 20 }}
                          className="drop-caret"
                          type={isVisible ? "caret-up" : "caret-down"}
                        />
                      )}
                    </div>
                  </Dropdown>
                </UserInfoButton>
              )}
            </MenuFooter>
          </MenuWrapper>
        </SideBar>
      </FixedSidebar>
    );
  }
}

SideMenu.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const enhance = compose(
  withRouter,
  withWindowSizes,
  connect(
    ({ authorUi, user }) => ({
      isSidebarCollapsed: authorUi.isSidebarCollapsed,
      firstName: get(user, "user.firstName", "")
    }),
    { toggleSideBar: toggleSideBarAction, logout: logoutAction }
  )
);

export default enhance(SideMenu);

const FixedSidebar = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  @media (max-width: 768px) {
    z-index: 9999;
  }
`;
const SideBar = styled(Layout.Sider)`
  height: 100vh;
  width: 240px;
  max-width: 240px;
  min-width: 240px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fbfafc;
  z-index: 22;
  &.ant-layout-sider-collapsed .logoWrapper {
    padding: 5px 20px;
  }
  .footerBottom {
    position: fixed;
    bottom: 10px;
    width: 240px;
  }
  &.ant-layout-sider-collapsed .footerBottom {
    padding: 8px 8px 0px;
    width: 100px;
  }
  &.ant-layout-sider-collapsed .questionBtn {
    width: 60px;
    height: 60px;
    border-radius: 65px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
    background-color: #ffffff;
    padding: 0px;
    margin: 0 auto;
    justify-content: center;
    margin-bottom: 15px;

    &:hover {
      background: #1890ff;
    }
  }
  &.ant-layout-sider-collapsed .userinfoBtn {
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
    background-color: #1fe3a1;
    justify-content: space-between;
    padding: 10px;
    margin: 0px;
  }
  &.ant-layout-sider-collapsed .userinfoBtn .ant-select-arrow {
    right: 15px;
    top: 25px;
  }
  &.ant-layout-sider-collapsed .ant-select-selection-selected-value {
    display: none !important;
  }
  &.ant-layout-sider-has-trigger .ant-layout-sider-trigger {
    display: none !important;
  }
  &.ant-layout-sider-collapsed .ant-select {
    width: auto;
    padding-left: 5px;
  }
  .ant-layout-sider-zero-width-trigger {
    top: 10px;
    right: -50px;
    color: #fff;
    background: transparent;
    display: none;
  }
  .ant-select {
    width: 125px;
  }
  @media (max-width: 768px) {
    flex: 0 0 0px;
    max-width: 0px;
    min-width: 0px;
    width: 0px;
  }
`;

const LogoWrapper = styled(Row)`
  padding: 18px 20px;
  text-align: center;
  display: flex;
  align-items: center;
`;

const LogoDash = styled.div`
  width: 90%;
  height: 0;
  opacity: 0.61;
  border-bottom: solid 1px #d9d6d6;
  margin: 0 auto;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: calc(100vh - 89px);
  padding: 20px 0px 10px;
`;

const Menu = styled(AntMenu)`
  background: transparent;
  &:not(.ant-menu-horizontal) {
    .ant-menu-item-selected {
      background-color: transparent;
      color: #4aac8b;
      border-left: 3px solid rgb(74, 172, 139);
      &.removeSelectedBorder {
        border: none;
      }
    }
  }

  &.ant-menu-vertical .ant-menu-item:after,
  &.ant-menu-vertical-left .ant-menu-item:after,
  &.ant-menu-vertical-right .ant-menu-item:after,
  &.ant-menu-inline .ant-menu-item:after {
    content: unset;
  }
  &.ant-menu-inline,
  &.ant-menu-vertical,
  &.ant-menu-vertical-left {
    border-right: 0px;
  }
  &.ant-menu-inline {
    height: calc(100vh - 300px);
    overflow: auto;
  }
  &.ant-menu-inline .ant-menu-item {
    font-family: Open Sans;
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.36;
    letter-spacing: 0.3px;
    text-align: left;
    display: flex;
    align-items: center;
    margin-top: 16px;
    padding: 0px 10px 0px 25px;
    max-width: 100%;
  }
  &.ant-menu-inline-collapsed {
    width: 100px;
    height: calc(100vh - 300px);
    overflow: auto;
  }
  &.ant-menu-inline-collapsed > .ant-menu-item {
    display: flex;
    text-align: center;
    justify-content: center;
    margin-top: 10px;
    padding: 0px 10px 0px 10px !important;
    width: 100%;
  }
  &.ant-menu-inline > .ant-menu-item {
    margin-top: 10px;
  }
`;

const MenuItem = styled(AntMenu.Item)`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: 0.3px;
  text-align: left;
  color: #434b5d;
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const UserName = styled.div`
  font-size: 14px;
  color: #057750;
`;

const UserType = styled.div`
  font-size: 12px;
  color: #ffffff;
`;

const FooterDropDown = styled.div`
  position: relative;
  bottom: -4px;
  opacity: ${props => (props.isVisible ? "1" : "0")};
  transition: 0.2s;
  -webkit-transition: 0.2s;
  ul {
    background: #1fe3a1;
    border-bottom: 1px solid #4fd08c;
    border-radius: 15px 15px 0px 0px;
    overflow: hidden;
    &.ant-menu-inline-collapsed {
      width: 84px;
      height: auto;
      margin-top: 10px;
      margin-left: 8px;
      li {
        &.ant-menu-item {
          margin: 0px;
          height: 58px;
        }
      }
    }
    li {
      &.ant-menu-item {
        margin: 0px;
        padding: 5px 16px;
        height: 50px;
        &:hover,
        &:focus {
          background: #4fd08c;
        }
        a {
          color: white;
          font-size: 14px;
          font-weight: 600;
          &:hover,
          &:focus {
            color: white;
          }
          i {
            color: #425066;
            position: relative;
            margin-right: 5px;
            top: 2px;
            font-size: 20px;
          }
        }
      }
    }
  }
`;

const MenuFooter = styled.div``;

const QuestionButton = styled.div`
  border-radius: 65px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
  background-color: #ffffff;
  height: 60px;
  padding-left: 23px;
  margin: 10px 21px;
  display: flex;
  align-items: center;

  span {
    padding-left: 25px;
  }

  &:hover {
    background: #1890ff;
    svg {
      fill: #fff;
    }
    span {
      color: #fff;
    }
  }
`;

const UserInfoButton = styled.div`
  .footerDropdown {
    width: auto;
    height: 60px;
    border-radius: ${props => (props.isVisible ? "0px 0px 30px 30px" : "65px")};
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
    background-color: #1fe3a1;
    display: flex;
    align-items: center;
    padding: ${props => (props.isCollapsed ? 0 : "0px 25px 0px 55px")};
    margin: ${props => (props.isCollapsed ? 0 : "0 21px")};
    position: relative;
    font-weight: 600;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    .drop-caret {
      position: absolute;
      right: 10px;
      top: 20px;
    }
  }
  img {
    width: 44px;
    position: absolute;
    left: 10px;
  }
  .ant-select-selection {
    background: transparent;
    border: 0px;
    color: #ffffff;
  }
`;

const Logo = styled(IconHeader)`
  width: 119px;
  height: 20px;
`;

const LogoCompact = styled(IconLogoCompact)`
  width: 25px;
  height: 25px;
  margin: 10px;
  fill: #0eb08d;
  &:hover {
    fill: #0eb08d;
  }
`;

const HelpIcon = styled(IconQuestion)`
  fill: #1fe3a1;
  width: 25px;
  height: 22px;
`;

const IconDropdown = styled(AntIcon)`
  color: #ffffff;
  position: absolute;
  top: -10px;
`;
const LogoutIcon = styled(IconDropdown)`
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
`;
