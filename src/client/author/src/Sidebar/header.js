import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconHeader, IconClose, IconChevronLeft, IconLogoCompact } from "@edulastic/icons";

import Help from "./help";
import Navigation from "./navigation";
import { desktopSideBar } from "../actions/togglemenu";
import { responsiveSideBar } from "../actions/responsivetogglemenu";

const Header = ({ flag, desktopSideBar: desktop, sidebar, responsiveSideBar: responsive }) => (
  <Sidebar flag={flag} sidebar={sidebar}>
    <SidebarWrapper>
      <HeaderWrapper flag={flag} sidebar={sidebar}>
        {flag ? <IconCompact /> : <Icon />}
        <ArrowBtn onClick={desktop} />
        <ResponsiveToggleMenu onClick={responsive} />
      </HeaderWrapper>
      <Navigation flag={flag} />
      <Help flag={flag} />
    </SidebarWrapper>
  </Sidebar>
);

export default React.memo(
  connect(
    ({ ui }) => ({ flag: ui.flag, sidebar: ui.sidebar }),
    { desktopSideBar, responsiveSideBar }
  )(Header)
);

Header.propTypes = {
  flag: PropTypes.bool.isRequired,
  sidebar: PropTypes.bool.isRequired,
  desktopSideBar: PropTypes.func.isRequired,
  responsiveSideBar: PropTypes.func.isRequired
};

const Sidebar = styled.div`
  @media (min-width: 1200px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: ${props => (props.flag ? "7rem" : "16.3rem")};
    background-color: #fbfafc;
    box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.16);
  }
  @media (max-width: 1200px) {
    display: block;
    position: absolute;
    top: 0;
    bottom:0;
    z-index: 100;
    height:100
    background-color: #fbfafc;
  }
  @media (max-width: 1060px) {
    width: 16rem;
    display: ${props => (props.sidebar ? "block" : "none")};
  }
  @media (max-width: 425px) {
    width: 100%;
  }
`;

// empty component???
const SidebarWrapper = styled.div``;
const HeaderWrapper = styled.div`
  padding: ${props => (props.flag ? " 1.7rem 1rem 1.7rem 2.5rem" : "1.8rem 1rem")};
  margin: ${props => (props.flag ? "0rem" : "0rem 2rem")};
  border-bottom: 1px solid #d9d6d6;
  text-align: center;
  align-items: center;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  @media (max-width: 1024px) {
    margin: 0rem 1rem;
  }
`;

const Icon = styled(IconHeader)`
  width: 119px;
  height: 20px;
`;

const IconCompact = styled(IconLogoCompact)`
  width: 25px;
  height: 25px;
  fill: #0eb08d;
  &:hover {
    fill: #0eb08d;
  }
`;

const ArrowBtn = styled(IconChevronLeft)`
  width: 16px;
  height: 16px;
  fill: #1fe3a1;
  float: left;
  cursor: pointer;
  display: none;
  &:hover {
    fill: #1fe3a1;
  }
  @media (min-width: 1200px) {
    float: right;
    display: block;
  }
  @media (max-width: 1024px) {
    margin-right: 1rem;
  }
`;

const ResponsiveToggleMenu = styled(IconClose)`
  width: 16px;
  height: 16px;
  @media (min-width: 1200px) {
    display: none;
    @media (max-width: 1060px) {
      fill: #4aac8b;
      width: 15px;
      height: 15px;
      float: left;
      cursor: pointer;
      display: block;
      margin-left: 1rem;
    }
    &:hover {
      fill: #1fe3a1;
    }
  }
`;
