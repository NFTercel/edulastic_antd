import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu } from "antd";

export const ControlDropDown = props => {
  const handleMenuClick = event => {
    props.updateTableCB(event);
  };

  const menu = (
    <Menu className={`${props.className}`} onClick={handleMenuClick}>
      <Menu.Item key="0" disabled={true}>
        Compare By
      </Menu.Item>
      <Menu.Item key="school">School</Menu.Item>
      <Menu.Item key="teacher">Teacher</Menu.Item>
      <Menu.Item key="class">Class</Menu.Item>
    </Menu>
  );

  return (
    <div className={`${props.className}`}>
      <Dropdown overlay={menu}>
        <Button>Compare by {props.groupby}</Button>
      </Dropdown>
    </div>
  );
};
