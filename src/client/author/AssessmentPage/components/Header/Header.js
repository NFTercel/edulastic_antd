import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Menu, Icon } from "antd";

import { IconSave } from "@edulastic/icons";

import HeaderWrapper from "../../../src/mainContent/headerWrapper";
import Title from "../../common/Title";
import TestPageNav from "../../../TestPage/components/TestPageNav/TestPageNav";
import { Status, SaveWrapper } from "./styled";

const saveMenu = handleClick => (
  <Menu>
    <Menu.Item onClick={handleClick("draft")}>Save as draft</Menu.Item>
    <Menu.Item onClick={handleClick("published")}>Save & publish</Menu.Item>
  </Menu>
);

const Header = ({ onTabChange, currentTab, tabs, title, status, onSave }) => (
  <HeaderWrapper>
    <Title>
      {title} <Status>{status}</Status>
    </Title>
    <TestPageNav onChange={onTabChange} current={currentTab} buttons={tabs} />
    <SaveWrapper>
      <Dropdown overlay={saveMenu(onSave)} trigger={["click"]}>
        <Button type="primary" size="large">
          <IconSave /> Save <Icon type="down" />
        </Button>
      </Dropdown>
    </SaveWrapper>
  </HeaderWrapper>
);

Header.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Header;
